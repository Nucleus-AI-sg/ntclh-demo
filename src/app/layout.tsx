import type { Metadata } from "next"
import Script from "next/script"
import { DM_Sans } from "next/font/google"
import { Sidebar } from "@/components/layout/sidebar"
import { TopBar } from "@/components/layout/top-bar"
import "./globals.css"

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
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
      className={`${dmSans.variable} light antialiased`}
    >
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SQGFFNEEM1"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SQGFFNEEM1');
          `}
        </Script>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-neutral-50 font-body text-neutral-900">
        <Sidebar />
        <main className="ml-60 min-h-screen">
          <TopBar />
          <div className="px-4 py-4">{children}</div>
        </main>
      </body>
    </html>
  )
}
