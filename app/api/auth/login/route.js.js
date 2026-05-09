import jwt from "jsonwebtoken";

const ADMIN_EMAIL = "arshdeepgrewal628@gmail.com";
const ADMIN_PASSWORD = "arsh5318";

export async function POST(req) {
  const { email, password } = await req.json();

  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return Response.json({
      success: false,
      message: "Invalid credentials",
    });
  }

  const token = jwt.sign(
    { email },
    "paperlix_secret_key",
    { expiresIn: "7d" }
  );

  return Response.json({
    success: true,
    token,
  });
}