export const dynamic = "force-dynamic";

export default async function EntriesPage() {
  const res = await fetch("http://localhost:3000/api/entries", { cache: "no-store" });
  const data = await res.json();

  if (!data.ok) {
    return <main style={{ padding: 24 }}>Error: {data.error}</main>;
  }

  const rows = data.rows || [];
  const header = rows[0] || ["name", "number", "comment", "createdAt"];
  const body = rows.slice(1);

  return (
    <main style={{ padding: 24 }}>
      <h1>Entries</h1>

      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            {header.map((h, i) => (
              <th key={i} style={{ textAlign: "left" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((r, idx) => (
            <tr key={idx}>
              {header.map((_, col) => (
                <td key={col}>{r[col] ?? ""}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
