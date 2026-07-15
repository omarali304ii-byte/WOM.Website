import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the production homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Word of Mouth — Brand strategy, identity &amp; digital experiences<\/title>/i);
  assert.match(html, /Make your brand the one people/i);
  assert.match(html, /Independent brand studio/i);
  assert.match(html, /hello@wordofmouth\.studio/i);
  assert.match(html, /application\/ld\+json/i);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|Canvas|parrot\.glb|react-three/i);
});

test("ships no 3D parrot implementation or model", async () => {
  const packageJson = await readFile(new URL("../package.json", import.meta.url), "utf8");
  assert.doesNotMatch(packageJson, /@react-three|\"three\"|framer-motion/i);
  await assert.rejects(access(new URL("../public/models/parrot.glb", import.meta.url)));
  await assert.rejects(access(new URL("../app/wom/Parrot3D.tsx", import.meta.url)));
  await assert.rejects(access(new URL("../app/wom/ParrotStage.tsx", import.meta.url)));
});

test("publishes search discovery routes", async () => {
  const [robots, sitemap] = await Promise.all([render("/robots.txt"), render("/sitemap.xml")]);
  assert.equal(robots.status, 200);
  assert.equal(sitemap.status, 200);
  assert.match(await robots.text(), /sitemap/i);
  assert.match(await sitemap.text(), /wordofmouth\.studio/i);
});
