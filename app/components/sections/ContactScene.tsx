"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import {
  addressLine,
  budgetOptions,
  contactMethodOptions,
  emailAddress,
  emailHref,
  mapsHref,
  partnerBadges,
  phoneHref,
  phoneNumber,
  quoteServiceOptions,
  socialLinks,
  whatsappHref,
} from "../../data/site";
import { useScene } from "../../lib/motion";
import { Tape } from "../art/collage";

const SUCCESS_MESSAGE =
  "Thank you for contacting Word of Mouth. Your request has been received, and our team will get in touch with you shortly.";
const ERROR_MESSAGE =
  "We couldn’t submit your request. Please check the required fields or contact us directly by phone, email, or WhatsApp.";

type SubmitState = "idle" | "submitting" | "success" | "error";
type FieldErrors = Record<string, string>;

/**
 * Scene 09 — The brief.
 * The story's conclusion: a cream project-brief sheet taped to the dark wall,
 * wired to the durable D1-backed quote pipeline.
 */
export function ContactScene() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const ref = useScene<HTMLElement>((root, media, g) => {
    if (media.reduced) return;

    const invite = g.timeline({
      scrollTrigger: { trigger: ".brief-rail", start: "top 78%" },
      defaults: { ease: "power3.out" },
    });
    invite
      .from(".brief-rail .mask-line > span", { yPercent: 110, stagger: 0.1, duration: 0.8 }, 0)
      .from(".brief-copy", { y: 24, autoAlpha: 0, duration: 0.6 }, 0.35)
      .from(".brief-channels > *", { y: 18, autoAlpha: 0, stagger: 0.06, duration: 0.55 }, 0.45)
      .from(".brief-sheet", { y: 40, rotation: 1.6, autoAlpha: 0, duration: 0.8 }, 0.4);

    // The invitation rail rises faster than the pinned-feeling sheet,
    // separating the two layers in depth while the scene scrolls.
    g.to(".brief-rail", {
      yPercent: -8,
      ease: "none",
      scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 0.5 },
    });
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.reportValidity()) return;

    const formData = new FormData(form);
    const payload = {
      fullName: formData.get("fullName"),
      companyName: formData.get("companyName"),
      phoneNumber: formData.get("phoneNumber"),
      jobTitle: formData.get("jobTitle"),
      emailAddress: formData.get("emailAddress"),
      serviceRequired: formData.get("serviceRequired"),
      estimatedBudget: formData.get("estimatedBudget"),
      preferredContactMethod: formData.get("preferredContactMethod"),
      projectDetails: formData.get("projectDetails"),
      consent: formData.get("consent") === "on",
      website: formData.get("website"),
    };

    setSubmitState("submitting");
    setMessage("");
    setFieldErrors({});

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        message?: string;
        fieldErrors?: FieldErrors;
      };

      if (!response.ok || !result.ok) {
        setSubmitState("error");
        setMessage(result.message || ERROR_MESSAGE);
        setFieldErrors(result.fieldErrors || {});
        return;
      }

      form.reset();
      setSubmitState("success");
      setMessage(result.message || SUCCESS_MESSAGE);
    } catch {
      setSubmitState("error");
      setMessage(ERROR_MESSAGE);
    }
  }

  return (
    <section className="brief" id="contact" ref={ref} data-header-dark aria-labelledby="contact-heading">
      <div className="page-container brief-shell">
        <div className="brief-rail">
          <p className="eyebrow eyebrow-light">
            <span aria-hidden="true" /> Let’s collaborate
          </p>
          <h2 className="brief-heading" id="contact-heading">
            <span className="mask-line"><span>Let’s create something</span></span>
            <span className="mask-line"><span>people will <em>remember.</em></span></span>
          </h2>
          <p className="brief-copy">
            Tell us about your business, goals, and the support you need. Our team will review
            your request and contact you to discuss the right next step.
          </p>

          <address className="brief-channels">
            <a href={emailHref}>
              <Mail aria-hidden="true" size={18} strokeWidth={1.5} />
              <span><small>Email</small>{emailAddress}</span>
            </a>
            <a href={phoneHref}>
              <Phone aria-hidden="true" size={18} strokeWidth={1.5} />
              <span><small>Phone</small>{phoneNumber}</span>
            </a>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
              <MessageCircle aria-hidden="true" size={18} strokeWidth={1.5} />
              <span><small>WhatsApp</small>Chat with our team</span>
            </a>
            <a href={mapsHref} target="_blank" rel="noopener noreferrer">
              <MapPin aria-hidden="true" size={18} strokeWidth={1.5} />
              <span><small>Studio</small>{addressLine}</span>
            </a>
          </address>

          <div className="brief-socials" aria-label="Social media">
            {socialLinks.map((social) => (
              <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer">
                {social.name} <ArrowUpRight aria-hidden="true" size={14} />
              </a>
            ))}
          </div>

          <div className="brief-badges" aria-label="Partner credentials">
            {partnerBadges.map((badge) => (
              <span key={badge}>{badge}</span>
            ))}
          </div>
        </div>

        <form className="brief-sheet" onSubmit={handleSubmit} noValidate={false} aria-label="Request a quote">
          <Tape className="brief-sheet-tape-1" />
          <Tape className="brief-sheet-tape-2" />

          <div className="brief-sheet-head">
            <span className="brief-sheet-title">Project brief</span>
            <span className="brief-sheet-req">Required fields *</span>
          </div>

          <div className="brief-grid">
            <label>
              <span>Full Name *</span>
              <input name="fullName" autoComplete="name" required minLength={2} maxLength={120} aria-invalid={Boolean(fieldErrors.fullName)} />
              {fieldErrors.fullName ? <small className="field-error">{fieldErrors.fullName}</small> : null}
            </label>
            <label>
              <span>Company Name *</span>
              <input name="companyName" autoComplete="organization" required maxLength={160} aria-invalid={Boolean(fieldErrors.companyName)} />
              {fieldErrors.companyName ? <small className="field-error">{fieldErrors.companyName}</small> : null}
            </label>
            <label>
              <span>Phone Number *</span>
              <input name="phoneNumber" type="tel" autoComplete="tel" required maxLength={40} aria-invalid={Boolean(fieldErrors.phoneNumber)} />
              {fieldErrors.phoneNumber ? <small className="field-error">{fieldErrors.phoneNumber}</small> : null}
            </label>
            <label>
              <span>Job Title *</span>
              <input name="jobTitle" autoComplete="organization-title" required minLength={2} maxLength={120} aria-invalid={Boolean(fieldErrors.jobTitle)} />
              {fieldErrors.jobTitle ? <small className="field-error">{fieldErrors.jobTitle}</small> : null}
            </label>
            <label>
              <span>Email Address *</span>
              <input name="emailAddress" type="email" autoComplete="email" required maxLength={254} aria-invalid={Boolean(fieldErrors.emailAddress)} />
              {fieldErrors.emailAddress ? <small className="field-error">{fieldErrors.emailAddress}</small> : null}
            </label>
            <label>
              <span>Service Required *</span>
              <select name="serviceRequired" required defaultValue="" aria-invalid={Boolean(fieldErrors.serviceRequired)}>
                <option value="" disabled>Select a service</option>
                {quoteServiceOptions.map((service) => <option key={service}>{service}</option>)}
              </select>
              {fieldErrors.serviceRequired ? <small className="field-error">{fieldErrors.serviceRequired}</small> : null}
            </label>
            <label>
              <span>Estimated Budget *</span>
              <select name="estimatedBudget" required defaultValue="" aria-invalid={Boolean(fieldErrors.estimatedBudget)}>
                <option value="" disabled>Select a range</option>
                {budgetOptions.map((budget) => <option key={budget}>{budget}</option>)}
              </select>
              {fieldErrors.estimatedBudget ? <small className="field-error">{fieldErrors.estimatedBudget}</small> : null}
            </label>
            <label>
              <span>Preferred Contact Method *</span>
              <select name="preferredContactMethod" required defaultValue="" aria-invalid={Boolean(fieldErrors.preferredContactMethod)}>
                <option value="" disabled>Select a method</option>
                {contactMethodOptions.map((method) => <option key={method}>{method}</option>)}
              </select>
              {fieldErrors.preferredContactMethod ? <small className="field-error">{fieldErrors.preferredContactMethod}</small> : null}
            </label>
            <label className="brief-details">
              <span>Project Details *</span>
              <textarea
                name="projectDetails"
                required
                minLength={20}
                maxLength={5000}
                rows={7}
                placeholder="Tell us about your business, your project goals, your target audience, and what you need help with."
                aria-invalid={Boolean(fieldErrors.projectDetails)}
              />
              {fieldErrors.projectDetails ? <small className="field-error">{fieldErrors.projectDetails}</small> : null}
            </label>

            <label className="brief-honeypot" aria-hidden="true">
              Website
              <input name="website" tabIndex={-1} autoComplete="off" />
            </label>

            <label className="brief-consent">
              <input name="consent" type="checkbox" required aria-invalid={Boolean(fieldErrors.consent)} />
              <span>I agree that Word of Mouth may use these details to respond to this project enquiry.</span>
            </label>
            {fieldErrors.consent ? <small className="field-error consent-error">{fieldErrors.consent}</small> : null}
          </div>

          <button className="button button-signal brief-submit" type="submit" disabled={submitState === "submitting"}>
            {submitState === "submitting" ? "Sending request…" : "Request a Quote"}
            <Send aria-hidden="true" size={17} strokeWidth={1.6} />
          </button>

          <div
            className={`brief-status${submitState === "success" ? " is-success" : ""}${submitState === "error" ? " is-error" : ""}`}
            role={submitState === "error" ? "alert" : "status"}
            aria-live="polite"
          >
            {message}
          </div>
        </form>
      </div>
    </section>
  );
}
