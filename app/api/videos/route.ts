import { env } from "cloudflare:workers";

type VideoEnv = { DB: D1Database; VIDEOS: R2Bucket };
const runtime = env as unknown as VideoEnv;

async function ensureTable() {
  await runtime.DB.prepare(`CREATE TABLE IF NOT EXISTS videos (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    object_key TEXT NOT NULL,
    content_type TEXT NOT NULL,
    size INTEGER NOT NULL,
    created_at INTEGER NOT NULL
  )`).run();
}

export async function GET() {
  await ensureTable();
  const result = await runtime.DB.prepare("SELECT id, title, category, size, created_at AS createdAt FROM videos ORDER BY created_at DESC").all();
  return Response.json({ videos: result.results.map((row) => ({ ...row, src: `/api/videos/${row.id}` })) });
}

export async function POST(request: Request) {
  await ensureTable();
  const form = await request.formData();
  const file = form.get("file");
  const title = String(form.get("title") || "").trim();
  const category = String(form.get("category") || "Product Demonstration").trim();
  if (!(file instanceof File) || !file.type.startsWith("video/") || !title) return Response.json({ error: "Please select a valid video and enter a title." }, { status: 400 });
  if (file.size > 500 * 1024 * 1024) return Response.json({ error: "The video must not exceed 500 MB." }, { status: 413 });
  const id = crypto.randomUUID();
  const key = `videos/${id}`;
  await runtime.VIDEOS.put(key, file.stream(), { httpMetadata: { contentType: file.type } });
  await runtime.DB.prepare("INSERT INTO videos (id, title, category, object_key, content_type, size, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)")
    .bind(id, title, category, key, file.type, file.size, Date.now()).run();
  return Response.json({ video: { id, title, category, size: file.size, createdAt: Date.now(), src: `/api/videos/${id}` } }, { status: 201 });
}
