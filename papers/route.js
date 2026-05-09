import { connectDB } from "@/lib/mongodb";
import Paper from "@/models/Paper";

export async function GET(req) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const year = searchParams.get("year");
    
    let query = {};
    
    if (category) {
      query.category = category;
    }
    if (year) {
      query.year = year;
    }
    
    const papers = await Paper.find(query).sort({ createdAt: -1 });
    
    return new Response(JSON.stringify(papers), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
