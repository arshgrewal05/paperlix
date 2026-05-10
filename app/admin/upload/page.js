"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function UploadPage() {
  const [papers, setPapers] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState("");
  const [pdf, setPdf] = useState(null);
  const [loading, setLoading] = useState(false);

  // FETCH PAPERS
  const fetchPapers = async () => {
    const { data } = await supabase.from("papers").select("*").order("id", { ascending: false });
    setPapers(data || []);
  };

  useEffect(() => {
    fetchPapers();
  }, []);

  // UPLOAD PAPER
  const uploadPaper = async () => {
    if (!pdf) return alert("Please select a PDF");

    setLoading(true);

    const fileExt = pdf.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage.from("papers").upload(fileName, pdf);

    if (uploadError) {
      alert(uploadError.message);
      setLoading(false);
      return;
    }

    const pdf_url = `https://oicvndvrhnfoaexoflxe.supabase.co/storage/v1/object/public/papers/${fileName}`;

    const { error: insertError } = await supabase
      .from("papers")
      .insert([{ title, category, description, year, pdf_url }]);

    if (insertError) {
      alert(insertError.message);
      setLoading(false);
      return;
    }

    alert("Paper uploaded successfully!");
    setTitle(""); setCategory(""); setDescription(""); setYear(""); setPdf(null);
    fetchPapers();
    setLoading(false);
  };

  return (
    <main style={{ minHeight: "100vh", padding: "20px", background: "#020817", color: "white" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>Admin Upload</h1>

      {/* FORM */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "30px" }}>
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <input placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
        <input placeholder="Year" value={year} onChange={e => setYear(e.target.value)} />
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <input type="file" accept=".pdf" onChange={e => setPdf(e.target.files[0])} />
        <button onClick={uploadPaper}>{loading ? "Uploading..." : "Upload Paper"}</button>
      </div>

      {/* PAPERS LIST */}
      <div>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "10px" }}>Uploaded Papers</h2>
        <ul>
          {papers.map(p => (
            <li key={p.id} style={{ marginBottom: "10px" }}>
              <strong>{p.title}</strong> - {p.category} - {p.year} |{" "}
              <a href={p.pdf_url} target="_blank" rel="noreferrer" style={{ color: "lightgreen" }}>View PDF</a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}