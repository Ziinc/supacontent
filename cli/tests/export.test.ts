import exporter from "../src/export"

jest.mock("fs")
import fs from "fs"
import { createClient } from "@supabase/supabase-js"

test.todo("exports to json");

test("export to markdown", async () => {
  const client = createClient("some", "key") as jest.Mocked<any>
  client.limit.mockResolvedValue({
    data: [
      { id: 123, content_type_id: 111, data: { some: "data", other: "frontmatter" } }
    ]
  });

  await exporter.content(1, { format: "md", type: false, markdownBodyKey: "some" })
  expect(fs.writeFile).toBeCalled()
  expect((fs.writeFile as any).mock.calls[0][1]).toEqual(`---
other: frontmatter

---
data
`)

})