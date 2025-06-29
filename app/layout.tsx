import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";

const inter = Inter({ subsets: ["latin", "vietnamese"] });

export const metadata: Metadata = {
  title: "ParentCircle - Cộng đồng phụ huynh thông minh",
  description: "Kết nối phụ huynh, chia sẻ kinh nghiệm nuôi dạy con với AI hỗ trợ",
  keywords: "phụ huynh, nuôi dạy con, cộng đồng, AI, Việt Nam, gia đình",
  openGraph: {
    title: "ParentCircle - Cộng đồng phụ huynh thông minh",
    description: "Kết nối phụ huynh, chia sẻ kinh nghiệm nuôi dạy con với AI hỗ trợ",
    type: "website",
    locale: "vi_VN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <Navigation />
          <main className="pt-16">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
