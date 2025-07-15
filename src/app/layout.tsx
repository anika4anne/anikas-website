import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Anika's Website",
  description: "Developed by Anika A",
  icons: [{ rel: "icon", url: "/logo.jpg" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} relative min-h-screen`}>
      <head>{/* Only head elements here, no <div> allowed */}</head>
      <body>
        {/* Animated, multi-layered creative background */}
        <div className="fixed inset-0 -z-20">
          {/* Main animated gradient */}
          <div className="animate-gradient absolute inset-0 bg-gradient-to-br from-pink-300 via-purple-300 to-blue-200 opacity-90" />
          {/* Floating blobs */}
          <svg
            className="animate-float-slow absolute top-10 left-10 h-80 w-80 opacity-30"
            viewBox="0 0 200 200"
            fill="none"
          >
            <ellipse cx="100" cy="100" rx="90" ry="70" fill="#f9a8d4" />
          </svg>
          <svg
            className="animate-float-medium absolute right-20 bottom-20 h-96 w-96 opacity-20"
            viewBox="0 0 220 220"
            fill="none"
          >
            <ellipse cx="110" cy="110" rx="100" ry="80" fill="#a7f3d0" />
          </svg>
          {/* Sparkles */}
          <svg
            className="animate-spin-slow absolute top-1/4 left-1/3 h-16 w-16 opacity-40"
            viewBox="0 0 48 48"
            fill="none"
          >
            <circle cx="24" cy="24" r="22" stroke="#a78bfa" strokeWidth="2" />
            <circle cx="24" cy="24" r="4" fill="#f9a8d4" />
          </svg>
          <svg
            className="animate-spin-reverse absolute top-1/3 right-1/4 h-12 w-12 opacity-30"
            viewBox="0 0 32 32"
            fill="none"
          >
            <circle cx="16" cy="16" r="14" stroke="#f472b6" strokeWidth="2" />
            <circle cx="16" cy="16" r="3" fill="#a7f3d0" />
          </svg>
        </div>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
