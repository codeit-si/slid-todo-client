import localFont from "next/font/local";

import TanstackQueryProvider from "@/lib/tanstack-query-provider";

import type { Metadata } from "next";

import "@/styles/globals.css";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "Slid Todo",
  description: "Slid Todo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} font-pretendard`}>
        <TanstackQueryProvider>{children}</TanstackQueryProvider>
      </body>
    </html>
  );
}
