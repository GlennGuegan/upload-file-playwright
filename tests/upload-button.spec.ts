import { test, expect } from "@playwright/test"
import { join } from "path"

const file = join(__dirname, "../", "public/zenika-512x512.png")

test("upload file with button", async ({ page }) => {
  await page.goto("http://127.0.0.1:3000/")
  await page.getByRole("link", { name: "Upload with Button" }).click()
  await page
    .getByRole("heading", { name: "Upload with button" })
    .click()
  const fileChooserPromise = page.waitForEvent("filechooser")
  // await page.getByRole("button", { name: "Add File" }).click()
  await page.getByTestId("btn-upload").click()
  const fileChooser = await fileChooserPromise
  await fileChooser.setFiles(file)

  await page.getByRole("button", { name: "Upload" }).click()
})
