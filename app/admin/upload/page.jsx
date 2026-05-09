"use client";

import { useState } from "react";

export default function UploadPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [year, setYear] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/papers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        category,
        year,
        fileUrl,
      }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Paper Uploaded Successfully");

      setTitle("");
      setCategory("");
      setYear("");
      setFileUrl("");
    } else {
      alert("Upload Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow">
        <h1 className="text-3xl font-bold mb-6">
          Upload New Paper
        </h1>

        <form onSubmit={handleUpload}>
          <input
            type="text"
            placeholder="Paper Title"
            className="w-full border p-4 rounded-xl mb-4"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Category"
            className="w-full border p-4 rounded-xl mb-4"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <input
            type="text"
            placeholder="Year"
            className="w-full border p-4 rounded-xl mb-4"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />

          <input
            type="text"
            placeholder="PDF URL"
            className="w-full border p-4 rounded-xl mb-4"
            value={fileUrl}
            onChange={(e) => setFileUrl(e.target.value)}
          />

          <button className="bg-blue-600 text-white px-6 py-4 rounded-xl font-bold w-full">
            Upload Paper
          </button>
        </form>
      </div>
    </div>
  );
}
