import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { access, readFile } from "node:fs/promises";
import { createServer } from "node:net";
import { after, before, test } from "node:test";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const vinextCli = fileURLToPath(new URL("../node_modules/vinext/dist/cli.js", import.meta.url));
let baseUrl = "";
let devServer;
let serverOutput = "";

function getAvailablePort() {
  return new Promise((resolve, reject) => {
    const server = createServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      const port = typeof address === "object" && address ? address.port : 0;
      server.close((error) => (error ? reject(error) : resolve(port)));
    });
  });
}

before(async () => {
  const port = await getAvailablePort();
  baseUrl = `http://127.0.0.1:${port}`;
  devServer = spawn(
    process.execPath,
    [vinextCli, "dev", "--port", String(port), "--hostname", "127.0.0.1"],
    { cwd: projectRoot, env: { ...process.env, NODE_ENV: "development" }, stdio: ["ignore", "pipe", "pipe"] },
  );
  devServer.stdout.on("data", (chunk) => { serverOutput += chunk.toString(); });
  devServer.stderr.on("data", (chunk) => { serverOutput += chunk.toString(); });

  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    if (devServer.exitCode !== null) {
      throw new Error(`Vinext dev server exited early.\n${serverOutput}`);
    }
    try {
      const response = await fetch(baseUrl);
      if (response.ok) return;
    } catch {
      // The server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Timed out waiting for Vinext dev server.\n${serverOutput}`);
});

after(() => {
  devServer?.kill();
});

async function render(path = "/") {
  return fetch(`${baseUrl}${path}`, { headers: { accept: "text/html" } });
}

test("server-renders the conversion-focused homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Word of Mouth — Full-service digital marketing agency<\/title>/i);
  assert.match(html, /Ideas get noticed/i);
  assert.match(html, /Brands get remembered/i);
  assert.match(html, /Trusted by ambitious brands/i);
  assert.match(html, /Animated Video Production/i);
  assert.match(html, /Request a Quote/i);
  assert.match(html, /info@wordofmoutheg\.com/i);
  assert.match(html, /application\/ld\+json/i);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|Canvas|parrot\.glb|react-three/i);
});

test("server-renders the work index and a case study", async () => {
  const [workResponse, caseResponse] = await Promise.all([
    render("/work"),
    render("/work/ezeefresh-branding"),
  ]);
  assert.equal(workResponse.status, 200);
  assert.equal(caseResponse.status, 200);
  assert.match(await workResponse.text(), /Work built to elevate brands/i);
  const caseHtml = await caseResponse.text();
  assert.match(caseHtml, /Ezeefresh/i);
  assert.match(caseHtml, /Services delivered/i);
  assert.doesNotMatch(caseHtml, /verified result|% growth|ROI/i);
});

test("ships no 3D parrot implementation or model", async () => {
  const packageJson = await readFile(new URL("../package.json", import.meta.url), "utf8");
  assert.doesNotMatch(packageJson, /@react-three|\"three\"|framer-motion/i);
  await assert.rejects(access(new URL("../public/models/parrot.glb", import.meta.url)));
  await assert.rejects(access(new URL("../app/wom/Parrot3D.tsx", import.meta.url)));
  await assert.rejects(access(new URL("../app/wom/ParrotStage.tsx", import.meta.url)));
});

test("publishes expanded search discovery routes", async () => {
  const [robots, sitemap] = await Promise.all([render("/robots.txt"), render("/sitemap.xml")]);
  assert.equal(robots.status, 200);
  assert.equal(sitemap.status, 200);
  assert.match(await robots.text(), /sitemap/i);
  const sitemapXml = await sitemap.text();
  assert.match(sitemapXml, /wordofmoutheg\.com/i);
  assert.match(sitemapXml, /work\/ezeefresh-branding/i);
});
