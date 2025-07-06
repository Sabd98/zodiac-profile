"use client";

import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <section
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background:
          "radial-gradient(circle at left, #09141A, #0D1D23, #1F4247)",
      }}
    >
      <RegisterForm />
    </section>
  );
}
