import { test } from "@playwright/test"
import { join } from "path"

const file = join(__dirname, "../", "public/zenika-512x512.png")

test("upload file with input type file", async ({ page }) => {
  await page.goto("http://127.0.0.1:3000/")

  await page
    .getByRole("link", { name: "Upload with Input file" })
    .click()

  await page.getByLabel("Import File").click()

  await page.getByText("Import File").setInputFiles(file)
  await page.getByRole("button", { name: "Upload" }).click()
})
