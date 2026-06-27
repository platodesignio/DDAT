import type { Metadata } from "next"
import "./globals.css"
import { StoreProvider } from "@/lib/store"

export const metadata: Metadata = {
  title: "DDAT Studio",
  description: "Dialectical Direction Audit Theory — simulate whether a system expands freedom or closes the future.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-white text-[#0a0a0a]">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  )
}
