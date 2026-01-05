export async function GET() {
  try {
    const url = process.env.SHEETS_WEBAPP_URL;

    const res = await fetch(url, { method: "GET" });
    const text = await res.text();

    return new Response(text, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
