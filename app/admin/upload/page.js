"use client";
export const dynamic = "force-dynamic"; // <--- disable prerendering

import { useEffect, useState } from "react";
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

  useEffect(() => {
    const fetchPapers = async () => {
      const { data } = await supabase
        .from("papers")
        .select("*")
        .order("id", { ascending: false });
      setPapers(data || []);
    };
    fetchPapers();
  }, []);

  const uploadPaper = async () => {
    if (!pdf) return alert("Select a PDF");
    setLoading(true);
    const fileExt = pdf.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase
      .storage
      .from("papers")
      .upload(fileName, pdf);

    if (uploadError) { alert(uploadError.message); setLoading(false); return; }

    const pdf_url = `https://oicvndvrhnfoaexoflxe.supabase.co/storage/v1/object/public/papers/${fileName}`;

    const { error: insertError } = await supabase
      .from("papers")
      .insert([{ title, category, description, year, pdf_url }]);

    if (insertError) { alert(insertError.message); setLoading(false); return; }

    alert("Uploaded successfully");
    setTitle(""); setCategory(""); setDescription(""); setYear(""); setPdf(null);
    setLoading(false);
    // re-fetch papers
    const { data } = await supabase.from("papers").select("*").order("id",{ascending:false});
    setPapers(data||[]);
  };

  return (
    <div style={{ padding: "20px", color: "white", background: "#020817" }}>
      <h1>Admin Upload Page</h1>
      <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
      <input placeholder="Category" value={category} onChange={e=>setCategory(e.target.value)} />
      <input placeholder="Year" value={year} onChange={e=>setYear(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
      <input type="file" accept=".pdf" onChange={e=>setPdf(e.target.files[0])} />
      <button onClick={uploadPaper}>{loading?"Uploading...":"Upload Paper"}</button>

      <h2>Uploaded Papers</h2>
      <ul>
        {papers.map(p => (
          <li key={p.id}>
            {p.title} - {p.category} - {p.year} | <a href={p.pdf_url} target="_blank">View PDF</a>
          </li>
        ))}
      </ul>
    </div>
  );
}