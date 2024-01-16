import type { Metadata } from "next"
import { Providers } from "./providers"

export const metadata: Metadata = {
  title: "POC Playwright Upload File",
  description:
    "This project is a POC to testing uploading file with plawright",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
