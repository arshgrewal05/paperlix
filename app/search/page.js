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

          <a
            key={cat}
            href={
              cat === "All"
                ? "/"
                : `/category/${cat.toLowerCase()}`
            }
            className={`px-5 py-3 rounded-2xl text-sm font-semibold transition border ${
              selectedCategory === cat
                ? "bg-blue-600 border-blue-500"
                : "bg-white/5 border-white/10 hover:bg-white/10"
            }`}
          >
            {cat}
          </a>

        ))}

      </div>

    </div>

    {/* RIGHT SIDE */}
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