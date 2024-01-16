import { NextResponse } from "next/server"
import fs from "fs"
import { join } from "path"

const UPLOAD_PATH = join(
  __dirname,
  "../../../../../",
  "/public/upload"
)

type Error = {
  status: number
  message: string
}

function isError(error: unknown): error is Error {
  const err = error as Error
  return err.status !== undefined && err.message !== undefined
}

export async function POST(request: Request) {
  console.log("@Post - upload")
  const { formData } = request
  const formdata = await formData()
  console.log({ formdata })

  try {
    const file = formdata.get("file") as File
    if (file === null) {
      throw {
        status: 400,
        message: `@upload action : file doesn't exist`,
      }
    }
    const buffer = await file.arrayBuffer()
    const unit8array = new Uint8Array(buffer)

    const hasFile = fs.existsSync(join(UPLOAD_PATH, `${file.name}`))

    if (hasFile)
      throw {
        status: 409,
        message: `@upload action : this file "${file.name}" already exist`,
      }

    fs.writeFile(
      join(UPLOAD_PATH, file.name),
      unit8array,
      "utf-8",
      (err) => {
        if (err) throw { status: 500, message: err }
      }
    )
    return NextResponse.json(
      {
        filename: file.name,
      },
      { status: 200 }
    )
  } catch (error) {
    if (isError(error)) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: error.status,
        }
      )
    }
    return error
  }
}
