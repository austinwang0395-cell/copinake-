import { env } from "cloudflare:workers";
type VideoEnv = { DB: D1Database; VIDEOS: R2Bucket };
const runtime = env as unknown as VideoEnv;

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const row = await runtime.DB.prepare("SELECT object_key AS objectKey, content_type AS contentType FROM videos WHERE id = ?").bind(id).first<{ objectKey: string; contentType: string }>();
  if (!row) return new Response("Not found", { status: 404 });
  const range = request.headers.get("range");
  const object = await runtime.VIDEOS.get(row.objectKey, range ? { range: request.headers } : undefined);
  if (!object) return new Response("Not found", { status: 404 });
  const headers = new Headers();
  object.writeHttpMetadata(headers); headers.set("etag", object.httpEtag); headers.set("accept-ranges", "bytes"); headers.set("cache-control", "private, max-age=3600");
  if (object.range && "offset" in object.range) {
    const end = object.range.offset + object.range.length - 1;
    headers.set("content-range", `bytes ${object.range.offset}-${end}/${object.size}`);
    headers.set("content-length", String(object.range.length));
    return new Response(object.body, { status: 206, headers });
  }
  headers.set("content-length", String(object.size));
  return new Response(object.body, { headers });
}
