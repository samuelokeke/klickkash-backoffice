import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import TanstackProvider from "@/context/TanstackProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Klickkash Back office",
  description: "Manage activties and transaction in one place",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} ${geistMono.variable} antialiased`}>
        <TanstackProvider>
          {children}

          <ReactQueryDevtools initialIsOpen={false} />
        </TanstackProvider>

        <Toaster />
      </body>
    </html>
  );
}
