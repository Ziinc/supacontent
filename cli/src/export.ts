import { makeClient, signIn } from "./client";
import { SERVICE_ROLE_KEY } from "./constants";
import { writeFile } from "node:fs";

export const exportContent = async (
  projectId: number,
  options: { type: boolean }
) => {
  let client = makeClient();
  let session;
  if (!SERVICE_ROLE_KEY) {
    console.log("Initiating login using EMAIL and PASSWORD env variables...");
    const result: any = await signIn(client);
    session = result.data.session;
  }

  let data;
  if (options.type) {
    //   @ts-ignore
    const result = await makeClient(session)
      .from("supacontent_content_types")
      .select(
        `
      *, supacontent_content(*)
  `
      )
      .filter("project_id", "eq", projectId);
    data = result.data;
  } else {
    //   @ts-ignore
    const result = await makeClient(session)
      .from("supacontent_content")
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

  //   const data = new Uint8Array(Buffer.from("Hello Node.js"));
  writeFile("export.json", JSON.stringify(data), (err) => {
    if (err) throw err;
    console.log("The export to export.json is complete.");
  });
};
