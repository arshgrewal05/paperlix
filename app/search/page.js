"use client";

import { useEffect, useState } from "react";

export default function Home() {

  const [papers, setPapers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "SSC",
    "UPSC",
    "CBSE",
    "PSEB",
    "Punjab Board",
    "GNDU",
    "PSTET",
    "Railway",
    "Teaching",
  ];

  // FETCH PAPERS
  const fetchPapers = async () => {

    try {

      const res = await fetch("/api/papers");
      const data = await res.json();

      if (data.success) {
        setPapers(data.data);
      }

    } catch (err) {
      console.log(err);
    }

  };

  useEffect(() => {
    fetchPapers();
  }, []);

  // FILTER
  const filteredPapers = papers.filter((paper) => {

    const matchesSearch =
      paper.title
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      paper.category === selectedCategory;

    return matchesSearch && matchesCategory;

  });

  return (
    <main className="min-h-screen bg-[#020817] text-white">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#020817]/90 backdrop-blur-xl">

        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-2xl font-black shadow-lg shadow-blue-500/30">
              P
            </div>

            <div>

              <h1 className="text-2xl font-black tracking-tight">
                Paperlix
              </h1>

              <p className="text-xs text-gray-400">
                India's Modern Study Hub
              </p>

            </div>

          </div>

          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-300">

            <a href="/" className="hover:text-blue-400 transition">
              Home
            </a>

            <a href="/category/ssc" className="hover:text-blue-400 transition">
              SSC
            </a>

            <a href="/category/upsc" className="hover:text-blue-400 transition">
              UPSC
            </a>

            <a href="/category/railway" className="hover:text-blue-400 transition">
              Railway
            </a>

          </div>

          <a
            href="/admin"
            className="bg-blue-600 hover:bg-blue-700 transition px-5 py-2 rounded-xl font-semibold"
          >
            Admin Upload
          </a>

        </div>

      </nav>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 py-20">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <div>

            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-semibold mb-8">
              🔥 Trusted by Students Across India
            </div>

            <h2 className="text-5xl lg:text-7xl font-black leading-tight tracking-tight">
              Download
              <span className="text-blue-500"> Previous Year </span>
              Papers Instantly
            </h2>

            <p className="mt-8 text-xl text-gray-400 leading-relaxed max-w-2xl">
              Access SSC, UPSC, CBSE, Punjab Board, University papers,
              notes, PDFs and study material in one modern platform.
            </p>

            {/* SEARCH */}
            <div className="mt-10 bg-white/5 border border-white/10 rounded-3xl p-3 flex flex-col md:flex-row gap-3 backdrop-blur-xl shadow-2xl">

              <input
                type="text"
                placeholder="Search exam, university, subject..."
                className="flex-1 bg-transparent px-5 py-4 outline-none text-lg"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <a
                href={`/search?q=${search}`}
                className="bg-blue-600 hover:bg-blue-700 transition px-8 py-4 rounded-2xl font-bold text-lg text-center"
              >
                Search
              </a>

            </div>

            {/* CATEGORY CHIPS */}
            <div className="flex flex-wrap gap-3 mt-8">

              {categories.map((cat) => (

                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-3 rounded-2xl text-sm font-semibold transition border ${
                    selectedCategory === cat
                      ? "bg-blue-600 border-blue-500"
                      : "bg-white/5 border-white/10 hover:bg-white/10"
                  }`}
                >
                  {cat}
                </button>

              ))}

            </div>

          </div>

          {/* RIGHT */}
          <div className="relative">

            <div className="absolute inset-0 bg-blue-600 blur-3xl opacity-20 rounded-full"></div>

            <div className="relative bg-white/5 border border-white/10 rounded-[40px] p-8 backdrop-blur-2xl shadow-2xl overflow-hidden">

              <div className="flex items-center justify-between mb-8">

                <div>

                  <h3 className="text-3xl font-black">
                    Trending Categories
                  </h3>

                  <p className="text-gray-400 mt-2">
                    Most searched exam categories
                  </p>

                </div>

                <div className="bg-yellow-400 text-black font-black px-4 py-2 rounded-2xl">
                  10K+
                </div>

              </div>

              <div className="grid grid-cols-2 gap-4">

                {[
                  "SSC",
                  "UPSC",
                  "PSEB",
                  "CBSE",
                  "Railway",
                  "Punjab Police",
                  "PSTET",
                  "GNDU",
                ].map((item) => (

                  <a
                    key={item}
                    href={`/category/${item.toLowerCase()}`}
                    className="bg-[#0f172a] hover:bg-blue-600 transition border border-white/10 rounded-3xl p-6 cursor-pointer group"
                  >

                    <h4 className="font-bold text-lg group-hover:text-white">
                      {item}
                    </h4>

                    <p className="text-gray-400 text-sm mt-2 group-hover:text-blue-100">
                      Previous papers & notes
                    </p>

                  </a>

                ))}

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* PAPERS */}
      <section className="max-w-7xl mx-auto px-4 pb-20">

        <div className="mb-12">

          <h2 className="text-5xl font-black">
            Latest Papers
          </h2>

          <p className="text-gray-400 mt-4 text-lg">
            Recently uploaded papers from all categories.
          </p>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {filteredPapers.map((paper, index) => (

            <div
              key={index}
              className="group bg-white/5 border border-white/10 hover:border-blue-500/40 hover:bg-blue-500/5 rounded-[32px] p-7 transition duration-300 shadow-xl backdrop-blur-xl"
            >

              <div className="flex items-center justify-between mb-6">

                <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-4 py-2 rounded-full text-sm font-bold">
                  {paper.category || "Paper"}
                </span>

                <span className="text-gray-400 text-sm font-medium">
                  {paper.year}
                </span>

              </div>

              <h3 className="text-2xl font-black leading-snug min-h-[90px] group-hover:text-blue-400 transition">
                {paper.title}
              </h3>

              <p className="text-gray-400 mt-4 leading-relaxed text-sm min-h-[60px]">
                {paper.description}
              </p>

              <div className="mt-8 flex gap-3">

                <a
                  href={paper.pdf_url}
                  target="_blank"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 transition text-center py-4 rounded-2xl font-bold"
                >
                  Download
                </a>

                <a
                  href={paper.pdf_url}
                  target="_blank"
                  className="flex-1 bg-white/5 border border-white/10 hover:bg-white/10 transition text-center py-4 rounded-2xl font-bold"
                >
                  Preview
                </a>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-14 bg-[#020817]">

        <div className="max-w-7xl mx-auto px-4 text-center">

          <h2 className="text-4xl font-black text-blue-400">
            Paperlix
          </h2>

          <p className="text-gray-400 mt-4 text-lg">
            India's Modern Platform for Previous Year Papers & Notes.
          </p>

          <p className="text-gray-500 mt-8 text-sm">
            © 2026 Paperlix. All rights reserved.
          </p>

          <p className="text-gray-500 mt-2 text-sm">
            Founded by
            <span className="text-blue-400 font-semibold">
              {" "}Arsh Grewal
            </span>
          </p>

        </div>

      </footer>

    </main>
  );
}