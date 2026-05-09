import { connectDB } from "@/lib/mongodb";
import Paper from "@/models/Paper";

export async function GET() {
  await connectDB();

  const papers = await Paper.find().sort({ createdAt: -1 });

  return Response.json(papers);
}

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const paper = await Paper.create({
      title: body.title,
      category: body.category,
      year: body.year,
      fileUrl: body.fileUrl,
    });

    return Response.json({
      success: true,
      paper,
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message,
    });
  }
}
