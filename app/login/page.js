"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Login Successful");
      router.push("/admin");
    }
  };

  return (
    <main className="min-h-screen bg-[#020817] flex items-center justify-center px-4">
      
      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">

        <h1 className="text-4xl font-black text-white text-center">
          Admin Login
        </h1>

        <p className="text-gray-400 text-center mt-3">
          Login to manage Paperlix uploads
        </p>

        <form onSubmit={handleLogin} className="mt-10 space-y-5">

          <input
            type="email"
            placeholder="Email"
            className="w-full bg-[#0f172a] border border-white/10 rounded-2xl px-5 py-4 text-white outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full bg-[#0f172a] border border-white/10 rounded-2xl px-5 py-4 text-white outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition py-4 rounded-2xl text-white font-bold text-lg"
          >
            Login
          </button>

        </form>

      </div>

    </main>
  );
}