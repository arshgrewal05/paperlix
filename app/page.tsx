export default function Home() {
  const categories = [
    "UPSC",
    "SSC",
    "Railway",
    "Punjab Govt",
    "CTET",
    "PSTET",
    "D.El.Ed",
    "ETT",
    "B.Ed",
    "BA",
    "BSc",
    "BCom",
    "BTech",
    "MSc",
    "MA",
    "10th Class",
    "12th Class",
    "CBSE",
    "PSEB",
    "Delhi University",
    "GNDU",
    "Punjab University",
    "Punjabi University",
  ];

  const papers = [
    {
      title: "SSC CGL Quant Paper 2025",
      type: "Government Exam",
      year: "2025",
    },
    {
      title: "BSc Physics Semester 2",
      type: "University Exam",
      year: "2024",
    },
    {
      title: "PSTET Punjabi Paper",
      type: "Teaching Exam",
      year: "2023",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-700 to-blue-500 flex items-center justify-center shadow-lg">
              <span className="text-white text-3xl font-extrabold">P</span>
            </div>

            <div>
              <h1 className="text-3xl font-extrabold text-[#1C375B] tracking-tight">
                Paperlix
              </h1>
              <p className="text-sm text-gray-500 font-medium">
                India’s Exam Download Hub
              </p>
            </div>
          </div>
        </div>
      </nav>

      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold text-sm mb-6">
              🔥 Trusted by Students Across India
            </div>

            <h2 className="text-5xl lg:text-6xl font-extrabold leading-tight text-[#1C375B]">
              Download PYQs, Notes & Exam Papers Instantly
            </h2>

            <p className="mt-8 text-xl text-gray-600 leading-relaxed">
              Previous year question papers for competitive exams,
              universities, schools, and teaching exams.
            </p>
          </div>

          <div className="bg-white rounded-[32px] shadow-2xl p-8 border">
            <h3 className="text-2xl font-bold text-[#1C375B] mb-6">
              Popular Categories
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {categories.map((item) => (
                <div
                  key={item}
                  className="bg-gray-100 hover:bg-blue-100 hover:text-blue-700 transition p-4 rounded-2xl text-center font-semibold cursor-pointer"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-[#1C375B] mb-10">
          Latest Papers
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {papers.map((paper, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl border shadow-sm p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {paper.type}
                </span>

                <span className="text-gray-500 text-sm font-medium">
                  {paper.year}
                </span>
              </div>

              <h3 className="text-2xl font-bold leading-snug">
                {paper.title}
              </h3>

              <div className="mt-6 flex gap-3">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl font-semibold">
                  Download
                </button>

                <button className="flex-1 border border-gray-300 py-3 rounded-2xl font-semibold">
                  Preview
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}