import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/custom/ThemeProvider";
import { Navbar1 } from "@/components/ui/custom/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { dark, neobrutalism, shadesOfPurple } from "@clerk/themes";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PDFtoCalendar",
  description: "Created to help students generate academic calendars from PDFs easily.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
<ClerkProvider
  appearance={{
    theme: [dark],
  }}
>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            >

        <Navbar1 menu={[]} logo = {{
          "url": "/",
          "src": "/image.png",
          "alt": "logo",
          "title": "PDFtoCalendar",
        }} />
        {children}
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
