import { makeClient, signIn } from "./client";
import { SERVICE_ROLE_KEY } from "./constants";
import {stringify} from "yaml"
import fs from "fs";
interface ContentDatum {
  id: number
  content_type_id: number
  data: unknown
  inserted_at: string
  updated_at: string

}
export const exportContent = async (
  projectId: number,
  options: { format: "json" | "md", type: boolean, markdownBodyKey?: string, directory?: string }
) => {
  let client = makeClient();
  let session;
  if (!SERVICE_ROLE_KEY) {
    console.log("Initiating login using EMAIL and PASSWORD env variables...");
    const result: any = await signIn(client);
    session = result.data.session;
  }

  let data :ContentDatum[];
  if (options.type) {
    const result =
      await client
        .from("content_types")
        .select(
          `
      *, content(*)
  `
        )
        .filter("project_id", "eq", projectId);
    data = result.data;
  } else {
    const result = await makeClient(session)
      .from("content")
      .select(
        `
      *,
      content_type:content_type_id (
          *
      )
  `
      )
      .filter("content_type.project_id", "eq", projectId)
      .limit(1);

    data = result.data;

  }
  if (options.format === "json") {
    //   const data = new Uint8Array(Buffer.from("Hello Node.js"));
    fs.writeFile("export.json", JSON.stringify(data), (err) => {
      if (err) throw err;
      console.log("The export to export.json is complete.");
    });
  } else if (options.format === "md") {

    if (!fs.existsSync(options.directory)) {
      fs.mkdirSync(options.directory);
    }
    const promises = data.map(datum => {
      let toStringify = Object.assign({}, datum["data"]);

      if (options.markdownBodyKey || datum["data"]["body"]) {
        delete toStringify[options.markdownBodyKey || "body"]
      } 

      const data = `---
${stringify(toStringify)}
---
${datum.data[options.markdownBodyKey || "body"] || ""}
`

      return writeFilePromise(`${options.directory}/${datum.id}.md`, data).then(() => {
        console.log("Markdown export completed.")
      }).catch(err => {
        console.error(err)
      })
    })

    await Promise.all(promises)
  }
};


const writeFilePromise = (path, data) => new Promise((resolve, reject) => {
  fs.writeFile(path, data, (err) => {
    if (err) reject(err)
    resolve(null)
  })
})


const exporter = { content: exportContent }

export default exporter;