"use client";
import React, { useState } from "react";
import { Mail, Lock, User } from "lucide-react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authAPI } from "@/lib/api";

//Login Component
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authAPI.login(email, password, username);
      const token = response.data.access_token.trim();

      localStorage.setItem("token", token);
      router.push("/");
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full max-w-md">
      <div className="flex items-center mb-8">
        <button onClick={() => router.back()} className="text-white">
          {/* Back icon */}
        </button>
        <h1 className="text-2xl font-bold text-white ml-4">Login</h1>
      </div>

      {error && (
        <div className="bg-red-500 text-white p-3 rounded-lg mb-4">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          name=""
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<Mail size={20} />}
          placeholder="Enter your email"
          required
        />

        <Input
          name=""
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          icon={<User size={20} />}
          placeholder="Enter your Userename"
          required
        />

        <Input
          name=""
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={<Lock size={20} />}
          placeholder="Enter your password"
          required
        />

        <Button
          type="submit"
          fullWidth
          disabled={loading}
          className="bg-gradient-to-r from-[#62CDCB] to-[#4599DB]
            hover:shadow-[0_8px_20px_-4px_#4599DB] 
            transition duration-150 ease-in-out"
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>

      <p className="text-center text-white mt-6">
        No account?{" "}
        <Link href="/register" className="text-yellow-200 font-bold">
          Register here
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
