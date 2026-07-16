"use client";

import { createChat } from "@n8n/chat";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const CHAT_STATUS_EVENT = "wom:n8n-chat-status";
const FRIENDLY_CONNECTION_ERROR =
  "We could not connect to support just now. Please try sending your message again in a moment.";

type ChatStatus = "idle" | "loading" | "ready" | "error";

type ChatMetadata = {
  source: "website";
  pageUrl: string;
  pageTitle: string;
};

type ChatRuntime = {
  status: ChatStatus;
  metadata: ChatMetadata;
  promise?: Promise<void>;
  observer?: MutationObserver;
  autoOpened?: boolean;
};

declare global {
  interface Window {
    __womN8nChat?: ChatRuntime;
  }
}

function publishStatus(status: ChatStatus) {
  window.dispatchEvent(new CustomEvent<ChatStatus>(CHAT_STATUS_EVENT, { detail: status }));
}

function currentMetadata(): ChatMetadata {
  return {
    source: "website",
    pageUrl: window.location.href,
    pageTitle: document.title,
  };
}

function makeToggleAccessible(target: HTMLElement) {
  const toggle = target.querySelector<HTMLElement>(".chat-window-toggle");
  if (!toggle) return;

  const chatWindow = target.querySelector<HTMLElement>(".chat-window");
  const isOpen = chatWindow ? window.getComputedStyle(chatWindow).display !== "none" : false;
  const accessibleLabel = `${isOpen ? "Close" : "Open"} Word of Mouth support chat`;

  toggle.setAttribute("aria-label", accessibleLabel);
  toggle.setAttribute("title", accessibleLabel);

  if (toggle.dataset.womAccessible === "true") return;

  toggle.dataset.womAccessible = "true";
  toggle.setAttribute("role", "button");
  toggle.setAttribute("tabindex", "0");
  toggle.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggle.click();
    }
  });
}

function openChatForTesting(target: HTMLElement, runtime: ChatRuntime) {
  if (runtime.autoOpened) return;

  const toggle = target.querySelector<HTMLElement>(".chat-window-toggle");
  const chatWindow = target.querySelector<HTMLElement>(".chat-window");
  if (!toggle || !chatWindow) return;

  runtime.autoOpened = true;
  if (window.getComputedStyle(chatWindow).display === "none") toggle.click();
}

function replaceConnectionError(target: HTMLElement) {
  const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();

  while (node) {
    if (node.nodeValue?.includes("Error: Failed to receive response")) {
      node.nodeValue = node.nodeValue.replace(
        "Error: Failed to receive response",
        FRIENDLY_CONNECTION_ERROR,
      );
      node.parentElement?.closest(".chat-message")?.classList.add("wom-chat-message-error");
    }
    node = walker.nextNode();
  }
}

function observeChat(target: HTMLElement, runtime: ChatRuntime) {
  const enhance = () => {
    makeToggleAccessible(target);
    replaceConnectionError(target);
  };

  enhance();
  runtime.observer?.disconnect();
  runtime.observer = new MutationObserver(enhance);
  runtime.observer.observe(target, {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
    attributeFilter: ["style", "class"],
  });
}

function initializeChat() {
  const existing = window.__womN8nChat;

  if (existing?.status === "ready" && document.querySelector("#n8n-chat .n8n-chat")) {
    publishStatus("ready");
    return Promise.resolve();
  }

  if (existing?.status === "loading" && existing.promise) return existing.promise;

  const runtime: ChatRuntime = existing ?? {
    status: "idle",
    metadata: currentMetadata(),
  };

  runtime.status = "loading";
  runtime.metadata = currentMetadata();
  window.__womN8nChat = runtime;
  publishStatus("loading");

  runtime.promise = Promise.resolve()
    .then(() => {
      const target = document.getElementById("n8n-chat");
      if (!target) throw new Error("The support chat target is missing.");

      if (!target.querySelector(".n8n-chat")) {
        createChat({
          webhookUrl: "/api/support-chat",
          target: "#n8n-chat",
          mode: "window",
          loadPreviousSession: false,
          showWelcomeScreen: false,
          initialMessages: [
            "Hi there! 👋 We are Word of Mouth. How can we help you today?",
          ],
          metadata: runtime.metadata,
          i18n: {
            en: {
              title: "Word of Mouth Support",
              subtitle: "Ask us a question",
              footer: "",
              getStarted: "New conversation",
              inputPlaceholder: "Type your message...",
              closeButtonTooltip: "Close chat",
            },
          },
        });
      }

      observeChat(target, runtime);
      window.requestAnimationFrame(() => openChatForTesting(target, runtime));
      runtime.status = "ready";
      publishStatus("ready");
    })
    .catch((error: unknown) => {
      console.error("Word of Mouth support chat failed to load:", error);
      runtime.status = "error";
      publishStatus("error");
      throw error;
    });

  return runtime.promise;
}

export function ChatWidget() {
  const pathname = usePathname();
  const [status, setStatus] = useState<ChatStatus>("loading");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const handleStatus = (event: Event) => {
      setStatus((event as CustomEvent<ChatStatus>).detail);
    };

    window.addEventListener(CHAT_STATUS_EVENT, handleStatus);
    void initializeChat().catch(() => undefined);

    return () => window.removeEventListener(CHAT_STATUS_EVENT, handleStatus);
  }, [attempt]);

  useEffect(() => {
    const syncPageMetadata = () => {
      if (window.__womN8nChat) {
        Object.assign(window.__womN8nChat.metadata, currentMetadata());
      }
    };

    syncPageMetadata();
    const frame = window.requestAnimationFrame(syncPageMetadata);
    const timer = window.setTimeout(syncPageMetadata, 250);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [pathname]);

  const retry = () => {
    if (window.__womN8nChat) window.__womN8nChat.status = "idle";
    setStatus("loading");
    setAttempt((value) => value + 1);
  };

  return (
    <>
      <div id="n8n-chat" />
      {status === "loading" ? (
        <div
          className="wom-chat-loader"
          role="status"
          aria-label="Loading Word of Mouth support chat"
          aria-live="polite"
        >
          <span className="wom-chat-loader-dot" aria-hidden="true" />
        </div>
      ) : null}
      {status === "error" ? (
        <div className="wom-chat-fallback" role="alert">
          <span>Support chat is temporarily unavailable.</span>
          <button type="button" onClick={retry}>
            Try again
          </button>
        </div>
      ) : null}
    </>
  );
}
