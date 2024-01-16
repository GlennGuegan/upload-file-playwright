"use client"
import { ArrowBackIcon } from "@chakra-ui/icons"
import { IconButton } from "@chakra-ui/react"
import { useRouter } from "next/navigation"

export default function UploadInputLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  const { back } = useRouter()
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <nav>
        <IconButton
          onClick={() => back()}
          icon={<ArrowBackIcon />}
          aria-label={""}
        />
      </nav>

      {children}
    </section>
  )
}
