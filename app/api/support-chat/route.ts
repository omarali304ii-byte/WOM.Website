const N8N_CHAT_WEBHOOK =
  "https://main-production-d903.up.railway.app/webhook/3049948b-920b-4200-a5bf-5f5e3f50c770/chat";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const headers = new Headers();
  const contentType = request.headers.get("content-type");
  const accept = request.headers.get("accept");

  if (contentType) headers.set("content-type", contentType);
  if (accept) headers.set("accept", accept);

  try {
    const upstream = await fetch(N8N_CHAT_WEBHOOK, {
      method: "POST",
      headers,
      body: await request.arrayBuffer(),
      cache: "no-store",
    });

    const responseHeaders = new Headers({ "cache-control": "no-store" });
    const upstreamContentType = upstream.headers.get("content-type");
    if (upstreamContentType) responseHeaders.set("content-type", upstreamContentType);

    return new Response(upstream.body, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers: responseHeaders,
    });
  } catch {
    return Response.json(
      { message: "The support service could not be reached." },
      { status: 502, headers: { "cache-control": "no-store" } },
    );
  }
}
