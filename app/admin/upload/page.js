"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function UploadPage() {
  const router = useRouter();

  const [papers, setPapers] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState("");
  const [pdf, setPdf] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // FETCH PAPERS
  const fetchPapers = async () => {
    const { data } = await supabase
      .from("papers")
      .select("*")
      .order("id", { ascending: false });
    setPapers(data || []);
  };

  useEffect(() => { fetchPapers(); }, []);

  // LOGOUT
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  // RESET FORM
  const resetForm = () => {
    setTitle(""); setCategory(""); setDescription(""); setYear(""); setPdf(null); setEditingId(null);
  };

  // UPLOAD PAPER
  const uploadPaper = async () => {
    if (!pdf) return alert("Please select a PDF");
    setLoading(true);

    const fileExt = pdf.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase
      .storage
      .from("papers")
      .upload(fileName, pdf);

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

    alert("Paper Uploaded Successfully");
    resetForm();
    fetchPapers();
    setLoading(false);
  };

  // DELETE PAPER
  const deletePaper = async (id) => {
    if (!confirm("Are you sure you want to delete this paper?")) return;
    const { error } = await supabase.from("papers").delete().eq("id", id);
    if (error) { alert(error.message); return; }
    alert("Paper Deleted");
    fetchPapers();
  };

  // START EDIT
  const startEdit = (paper) => {
    setEditingId(paper.id);
    setTitle(paper.title || "");
    setCategory(paper.category || "");
    setDescription(paper.description || "");
    setYear(paper.year || "");
  };

  // UPDATE PAPER
  const updatePaper = async () => {
    if (!editingId) return;
    const { error } = await supabase
      .from("papers")
      .update({ title, category, description, year })
      .eq("id", editingId);
    if (error) { alert(error.message); return; }
    alert("Paper Updated Successfully");
    resetForm();
    fetchPapers();
  };

  return (
    <main className="min-h-screen bg-[#020817] text-white px-4 py-10">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-black text-blue-400">Admin Upload</h1>
          <button onClick={handleLogout} className="bg-red-600 px-5 py-3 rounded-xl font-bold hover:bg-red-700">Logout</button>
        </div>

        {/* FORM */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl mb-10">
          <input type="text" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} className="w-full mb-3 p-3 rounded-xl bg-[#0f172a]" />
          <input type="text" placeholder="Category" value={category} onChange={e=>setCategory(e.target.value)} className="w-full mb-3 p-3 rounded-xl bg-[#0f172a]" />
          <input type="text" placeholder="Year" value={year} onChange={e=>setYear(e.target.value)} className="w-full mb-3 p-3 rounded-xl bg-[#0f172a]" />
          <textarea placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} className="w-full mb-3 p-3 rounded-xl bg-[#0f172a]" />
          <input type="file" accept=".pdf" onChange={e=>setPdf(e.target.files[0])} className="w-full mb-3 p-3 rounded-xl bg-[#0f172a]" />
          <button onClick={uploadPaper} className="w-full bg-blue-600 py-3 rounded-xl font-bold hover:bg-blue-700">{loading ? "Uploading..." : "Upload Paper"}</button>
        </div>

        {/* PAPERS LIST */}
        <div>
          <h2 className="text-3xl font-bold mb-4">Uploaded Papers</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {papers.map(paper => (
              <div key={paper.id} className="bg-white/5 border border-white/10 p-4 rounded-xl">
                <h3 className="font-bold text-lg">{paper.title}</h3>
                <p className="text-gray-400 text-sm">{paper.description}</p>
                <p className="text-gray-400 text-sm">{paper.category} - {paper.year}</p>
                <div className="flex gap-2 mt-2">
                  <a href={paper.pdf_url} target="_blank" className="bg-green-600 px-4 py-2 rounded-xl hover:bg-green-700">View PDF</a>
                  <button onClick={()=>startEdit(paper)} className="bg-yellow-500 px-4 py-2 rounded-xl hover:bg-yellow-600 font-bold text-black">Edit</button>
                  <button onClick={()=>deletePaper(paper.id)} className="bg-red-600 px-4 py-2 rounded-xl hover:bg-red-700 font-bold">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}