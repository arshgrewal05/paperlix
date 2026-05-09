"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function AdminPage() {
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

  useEffect(() => {
    fetchPapers();
  }, []);

  // LOGOUT
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  // RESET FORM
  const resetForm = () => {
    setTitle("");
    setCategory("");
    setDescription("");
    setYear("");
    setPdf(null);
    setEditingId(null);
  };

  // UPLOAD PAPER
  const uploadPaper = async () => {
    try {
      if (!pdf) {
        return alert("Please select PDF");
      }

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

      const pdf_url =
        `https://oicvndvrhnfoaexoflxe.supabase.co/storage/v1/object/public/papers/${fileName}`;

      const { error: insertError } = await supabase
        .from("papers")
        .insert([
          {
            title,
            category,
            description,
            year,
            pdf_url,
          },
        ]);

      if (insertError) {
        alert(insertError.message);
        setLoading(false);
        return;
      }

      alert("Paper Uploaded Successfully");

      resetForm();
      fetchPapers();

      setLoading(false);

    } catch (err) {
      console.log(err);
      alert("Upload Failed");
      setLoading(false);
    }
  };

  // DELETE PAPER
  const deletePaper = async (id) => {

    const confirmDelete = confirm(
      "Are you sure you want to delete this paper?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("papers")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

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
      .update({
        title,
        category,
        description,
        year,
      })
      .eq("id", editingId);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Paper Updated Successfully");

    resetForm();
    fetchPapers();
  };

  return (
    <main className="min-h-screen bg-[#020817] text-white px-4 py-10">

      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col lg:flex-row gap-10">

          {/* LEFT */}
          <div className="lg:w-[420px]">

            <div className="flex items-center justify-between mb-8">

              <div>

                <h1 className="text-4xl font-black text-blue-400">
                  Admin Dashboard
                </h1>

                <p className="text-gray-400 mt-2">
                  Manage papers & uploads
                </p>

              </div>

              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-2xl font-bold"
              >
                Logout
              </button>

            </div>

            {/* FORM */}
            <div className="bg-white/5 border border-white/10 rounded-[32px] p-6 backdrop-blur-xl">

              <div className="space-y-5">

                {/* TITLE */}
                <div>

                  <label className="block text-sm text-gray-400 mb-2">
                    Title
                  </label>

                  <input
                    type="text"
                    placeholder="SSC CGL Maths 2024"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-[#0f172a] border border-white/10 rounded-2xl px-5 py-4 outline-none"
                  />

                </div>

                {/* CATEGORY */}
                <div>

                  <label className="block text-sm text-gray-400 mb-2">
                    Category
                  </label>

                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#0f172a] border border-white/10 rounded-2xl px-5 py-4 outline-none"
                  >

                    <option value="">Select Category</option>
                    <option value="SSC">SSC</option>
                    <option value="UPSC">UPSC</option>
                    <option value="Railway">Railway</option>
                    <option value="CBSE">CBSE</option>
                    <option value="PSEB">PSEB</option>
                    <option value="GNDU">GNDU</option>
                    <option value="PSTET">PSTET</option>

                  </select>

                </div>

                {/* DESCRIPTION */}
                <div>

                  <label className="block text-sm text-gray-400 mb-2">
                    Description
                  </label>

                  <textarea
                    rows={4}
                    placeholder="Short description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-[#0f172a] border border-white/10 rounded-2xl px-5 py-4 outline-none"
                  />

                </div>

                {/* YEAR */}
                <div>

                  <label className="block text-sm text-gray-400 mb-2">
                    Year
                  </label>

                  <input
                    type="text"
                    placeholder="2025"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full bg-[#0f172a] border border-white/10 rounded-2xl px-5 py-4 outline-none"
                  />

                </div>

                {/* PDF */}
                {!editingId && (
                  <div>

                    <label className="block text-sm text-gray-400 mb-2">
                      Upload PDF
                    </label>

                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => setPdf(e.target.files[0])}
                      className="w-full bg-[#0f172a] border border-white/10 rounded-2xl px-5 py-4"
                    />

                  </div>
                )}

                {/* BUTTONS */}
                {editingId ? (
                  <div className="flex gap-3">

                    <button
                      onClick={updatePaper}
                      className="flex-1 bg-yellow-500 hover:bg-yellow-600 transition py-4 rounded-2xl font-bold text-black"
                    >
                      Update Paper
                    </button>

                    <button
                      onClick={resetForm}
                      className="flex-1 bg-gray-700 hover:bg-gray-800 transition py-4 rounded-2xl font-bold"
                    >
                      Cancel
                    </button>

                  </div>
                ) : (
                  <button
                    onClick={uploadPaper}
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 transition py-4 rounded-2xl font-bold text-lg"
                  >
                    {loading ? "Uploading..." : "Upload Paper"}
                  </button>
                )}

              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div className="flex-1">

            <div className="mb-8">

              <h2 className="text-4xl font-black">
                Uploaded Papers
              </h2>

              <p className="text-gray-400 mt-2">
                Manage all uploaded study material
              </p>

            </div>

            {/* PAPERS */}
            <div className="grid md:grid-cols-2 gap-6">

              {papers.map((paper) => (

                <div
                  key={paper.id}
                  className="bg-white/5 border border-white/10 rounded-[28px] p-6"
                >

                  <div className="flex items-center justify-between mb-4">

                    <span className="bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full text-sm font-bold border border-blue-500/20">
                      {paper.category}
                    </span>

                    <span className="text-gray-400 text-sm">
                      {paper.year}
                    </span>

                  </div>

                  <h3 className="text-2xl font-black leading-snug">
                    {paper.title}
                  </h3>

                  <p className="text-gray-400 mt-4 text-sm leading-relaxed">
                    {paper.description}
                  </p>

                  <div className="flex gap-3 mt-6">

                    <a
                      href={paper.pdf_url}
                      target="_blank"
                      className="flex-1 bg-green-600 hover:bg-green-700 transition text-center py-3 rounded-2xl font-bold"
                    >
                      View
                    </a>

                    <button
                      onClick={() => startEdit(paper)}
                      className="flex-1 bg-yellow-500 hover:bg-yellow-600 transition py-3 rounded-2xl font-bold text-black"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deletePaper(paper.id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 transition py-3 rounded-2xl font-bold"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}

