import LoginForm from "@/components/auth/LoginForm";


export default function LoginPage() {
  return (
    <section
      className="auth-container"
      style={{
        background: "radial-gradient(circle at left, #09141A, #0D1D23, #1F4247)",
      }}
    >
      <LoginForm />
    </section>
  );
}
