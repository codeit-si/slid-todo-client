import TanstackQueryProviders from "@/lib/tanstack-query-provider";

import type { Metadata } from "next";
import "@/styles/globals.css";

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
      <body>
        <TanstackQueryProviders>{children}</TanstackQueryProviders>
      </body>
    </html>
  );
}
