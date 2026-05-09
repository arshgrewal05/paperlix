import connectDB from "@/lib/db";
import Paper from "@/models/Paper";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      title,
      examType,
      state,
      subject,
      year,
      pdfUrl,
      tags,
    } = body;

    if (!title || !examType) {
      return Response.json({
        success: false,
        message: "Required fields missing",
      });
    }

    const paper = await Paper.create({
      title,
      examType,
      state,
      subject,
      year,
      pdfUrl,
      tags,
    });

    return Response.json({
      success: true,
      message: "Paper uploaded successfully",
      data: paper,
    });

  } catch (error) {
    return Response.json({
      success: false,
      error: error.message,
    });
  }
}