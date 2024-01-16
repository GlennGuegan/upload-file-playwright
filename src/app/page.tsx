"use client"
import { Button, Heading } from "@chakra-ui/react"
import Link from "next/link"

export default function Home() {
  return (
    <main>
      <Heading>Uploading file Project</Heading>
      <Button as={Link} href="/upload-input">
        Upload with Input file
      </Button>
      <Button as={Link} href="/upload-button">
        Upload with Button
      </Button>
    </main>
  )
}
