"use client"
import {
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react"
import axios from "axios"
import Image from "next/image"
import { ChangeEvent, FC, FormEvent, useState } from "react"

export const InputUpload: FC = () => {
  const [imageUrl, setImageUrl] = useState<string>()
  const formData = new FormData()

  const onChange = async (event: ChangeEvent<HTMLInputElement>) => {
    console.log("onchance")
    const f = event?.target.files?.[0] as File

    formData.set("file", f)
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const res = await axios.post("/api/upload", formData)
    if (res.status === 200) {
      const data = res.data
      setImageUrl(data.filename)
    }
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <FormControl>
          <FormLabel>Import File</FormLabel>
          <Input type="file" onChange={onChange} />
        </FormControl>
        <Button type="submit">Upload</Button>
      </form>
      {imageUrl && (
        <Image
          src={`/upload/${imageUrl}`}
          alt={"test"}
          width={500}
          priority={false}
          height={500}
        />
      )}
    </>
  )
}
