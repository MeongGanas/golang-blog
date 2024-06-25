import Navbar from "@/components/navbar";
import React from "react";
import "./globals.css";

export const metadata = {
  title: "Blog App",
  description: "Blog App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
