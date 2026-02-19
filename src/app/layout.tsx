import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MES Dashboard",
  description: "실시간 설비 모니터링 시스템",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={`${geist.className} flex h-screen bg-slate-50`}>
        <Sidebar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </body>
    </html>
  );
}
