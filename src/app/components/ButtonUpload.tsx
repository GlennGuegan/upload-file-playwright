"use client"
import { Button, VisuallyHiddenInput } from "@chakra-ui/react"
import axios from "axios"
import Image from "next/image"
import {
  ChangeEvent,
  FC,
  FormEvent,
  forwardRef,
  useRef,
  useState,
} from "react"

export const ButtonUpload: FC = () => {
  const [imageUrl, setImageUrl] = useState<string>()
  const ref = useRef(null)
  const formData = new FormData()

  const onChange = async (event: ChangeEvent<HTMLInputElement>) => {
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
        <VisuallyHiddenInput
          ref={ref}
          as="input"
          type="file"
          data-e2e="uploadFile"
          onChange={onChange}
        />
        <Btn ref={ref} />
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

const Btn = forwardRef(function Btn(props, ref) {
  return (
    <Button
      data-e2e="btn-upload"
      onClick={() => ref?.current?.click()}
    >
      Add File
    </Button>
  )
})
