import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import OpeningSlide from "./_components/OpeningSlide";

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
        <OpeningSlide />
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
