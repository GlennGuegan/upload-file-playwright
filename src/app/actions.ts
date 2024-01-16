"use server"
import fs from "fs"
import { join } from "path"

const UPLOAD_PATH = join(__dirname, "../../../../", "/public/upload")

export async function upload(data: FormData) {
  try {
    const file = data.get("file") as File
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
    return file.name
  } catch (error) {
    console.log(error)
    return error
  }
}
