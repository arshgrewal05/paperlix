import { supabase } from "@/lib/supabase";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const examType = searchParams.get("examType");
  const state = searchParams.get("state");
  const year = searchParams.get("year");

  let query = supabase.from("papers").select("*");

  if (examType) {
    query = query.eq("examType", examType);
  }

  if (state) {
    query = query.eq("state", state);
  }

  if (year) {
    query = query.eq("year", year);
  }

  const { data, error } = await query;

  if (error) {
    return Response.json({
      success: false,
      error: error.message,
    });
  }

  return Response.json({
    success: true,
    data,
  });
}