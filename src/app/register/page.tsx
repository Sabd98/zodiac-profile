"use client";

import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <section
      className="auth-container"
      style={{
        background:
          "radial-gradient(circle at left, #09141A, #0D1D23, #1F4247)",
      }}
    >
      <RegisterForm />
    </section>
  );
}
