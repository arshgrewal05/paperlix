"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function AdminPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState("");
  const [pdf, setPdf] = useState(null);

  const [loading, setLoading] = useState(false);

  // LOGOUT
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
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

      // STORAGE UPLOAD
      const { error: uploadError } =
        await supabase.storage
          .from("papers")
          .upload(fileName, pdf);

      if (uploadError) {
        alert(uploadError.message);
        setLoading(false);
        return;
      }

      const pdf_url =
        `https://oicvndvrhnfoaexoflxe.supabase.co/storage/v1/object/public/papers/${fileName}`;

      // DATABASE INSERT
      const { error: insertError } =
        await supabase.from("papers").insert([
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

      setTitle("");
      setCategory("");
      setDescription("");
      setYear("");
      setPdf(null);

      setLoading(false);

    } catch (err) {
      console.log(err);
      alert("Upload Failed");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#020817] text-white px-4 py-10">

      <div className="max-w-3xl mx-auto">

        {/* TOP */}
        <div className="flex items-center justify-between mb-10">

          <div>

            <h1 className="text-5xl font-black text-blue-400">
              Admin Upload
            </h1>

            <p className="text-gray-400 mt-3">
              Upload papers, notes & study material
            </p>

          </div>

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 transition px-5 py-3 rounded-2xl font-bold"
          >
            Logout
          </button>

        </div>

        {/* FORM */}
        <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-xl">

          <div className="space-y-6">

            {/* TITLE */}
            <div>

              <label className="block text-sm text-gray-400 mb-2">
                Paper Title
              </label>

              <input
                type="text"
                placeholder="SSC CGL Quant Paper 2025"
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
                placeholder="Enter short paper description..."
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

            {/* BUTTON */}
            <button
              onClick={uploadPaper}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 transition py-4 rounded-2xl font-bold text-lg"
            >
              {loading ? "Uploading..." : "Upload Paper"}
            </button>

          </div>

        </div>

      </div>

    </main>
  );
}