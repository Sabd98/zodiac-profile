import LoginForm from "@/components/auth/LoginForm";


export default function LoginPage() {
  return (
    <section
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: "radial-gradient(circle at left, #09141A, #0D1D23, #1F4247)",
      }}
    >
      <LoginForm />
    </section>
  );
}
