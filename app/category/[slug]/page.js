import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function CategoryPage({ params }) {

  const categoryName =
    params.slug.charAt(0).toUpperCase() +
    params.slug.slice(1);

  const { data: papers } = await supabase
    .from("papers")
    .select("*")
    .ilike("category", categoryName);

  return (
    <main className="min-h-screen bg-[#020817] text-white px-4 py-10">

      <div className="max-w-7xl mx-auto">

        {/* TOP */}
        <div className="mb-14">

          <a
            href="/"
            className="text-blue-400 font-semibold"
          >
            ← Back Home
          </a>

          <h1 className="text-6xl font-black mt-6">
            {categoryName} Papers
          </h1>

          <p className="text-gray-400 mt-4 text-lg">
            Previous year papers, PDFs & study material.
          </p>

        </div>

        {/* PAPERS */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {papers?.map((paper) => (

            <div
              key={paper.id}
              className="bg-white/5 border border-white/10 rounded-[32px] p-7"
            >

              <div className="flex items-center justify-between mb-5">

                <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-4 py-2 rounded-full text-sm font-bold">
                  {paper.category}
                </span>

                <span className="text-gray-400 text-sm">
                  {paper.year}
                </span>

              </div>

              <h2 className="text-2xl font-black leading-snug">
                {paper.title}
              </h2>

              <p className="text-gray-400 mt-4 text-sm leading-relaxed">
                {paper.description}
              </p>

              {/* BUTTONS */}
              <div className="flex gap-3 mt-6">

                <a
                  href={`/paper/${paper.id}`}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 transition text-center py-3 rounded-2xl font-bold"
                >
                  Preview
                </a>

                <a
                  href={paper.pdf_url}
                  target="_blank"
                  className="flex-1 bg-white/5 border border-white/10 hover:bg-white/10 transition text-center py-3 rounded-2xl font-bold"
                >
                  Download
                </a>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}