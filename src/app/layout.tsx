import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Sidebar } from "@/components/layout/sidebar"
import { TopBar } from "@/components/layout/top-bar"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "Nucleus AI - Career Placement Programme Management",
  description:
    "End-to-end career placement programme management platform for NTUC LearningHub",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} light antialiased`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-neutral-50 font-body text-neutral-900">
        <Sidebar />
        <main className="ml-64 min-h-screen">
          <TopBar />
          <div className="px-8 py-6">{children}</div>
        </main>
      </body>
    </html>
  )
}
