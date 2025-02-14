import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "use-ratelimits",
  description: "use-ratelimits",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
