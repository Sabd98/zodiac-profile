//Layout
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"],weight:"700"});

export const metadata = {
  title: "YouApp",
  description: "YouApp Technical Challenge",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gradient-to-b from-[#09141A] to-[#1d1d1d] text-white`}
      >
          <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}

  // const router = useRouter();

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token && !window.location.pathname.startsWith("/login")) {
  //     router.push("/login");
  //   }
  // }, [router]);