"use client";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [comment, setComment] = useState("");
  const [msg, setMsg] = useState("");

  async function submit(e) {
    e.preventDefault();
    setMsg("Saving...");

    try {
      const res = await fetch("/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, number, comment }),
      });

      const data = await res.json();
      setMsg(data.ok ? "Saved ✅" : "Error: " + (data.error || "Unknown error"));
    } catch (err) {
      setMsg("Error: Failed to fetch");
    }
  }

  return (
    <main style={{ padding: 24 }}>
      <form onSubmit={submit} style={{ display: "grid", gap: 10, maxWidth: 400 }}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />

        <textarea
          placeholder="Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>

      <p>{msg}</p>
    </main>
  );
}
