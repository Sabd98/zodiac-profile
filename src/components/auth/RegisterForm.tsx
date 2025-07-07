import React, { useState } from "react";
import { Mail, User, Lock } from "lucide-react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authAPI } from "@/lib/api";

//Form Component
const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  //Submit Register User Data
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await authAPI.register(email, username, password);
      // Redirect ke login setelah registrasi berhasil
      router.push("/login");
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="flex items-center mb-8">
        <button onClick={() => window.history.back()} className="text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h1 className="text-2xl font-bold text-white ml-4">Register</h1>
      </div>
      {error && (
        <div className="bg-red-500 text-white p-3 rounded-lg mb-4">{error}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          icon={<User size={20} />}
          placeholder="Create username"
          required
        />

        <Input
          name=""
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={<Lock size={20} />}
          placeholder="Create password"
          required
        />

        <Input
          name=""
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          icon={<Lock size={20} />}
          placeholder="Confirm password"
          required
        />

        <Button
          type="submit"
          fullWidth
          disabled={loading}
          className="submit-button-auth
            hover:shadow-[0_8px_20px_-4px_#4599DB] 
            transition duration-150 ease-in-out"
        >
          {loading ? "Registering..." : "Register"}
        </Button>
      </form>
      <p className="text-center text-white mt-6">
        Have an account?{" "}
        <Link href="/login" className="text-yellow-200 font-bold">
          Login here
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
