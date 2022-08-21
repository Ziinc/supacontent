import { makeClient, signIn } from "./client";
import { SERVICE_ROLE_KEY } from "./constants";
import { writeFile } from "node:fs";

export const exportContent = async (projectId: number) => {
  let client = makeClient();
  let accessToken;
  if (!SERVICE_ROLE_KEY) {
    console.log("Initiating login using EMAIL and PASSWORD env variables...");
    const result: any = await signIn();
    // console.log(result);
    // accessToken = result.session.access_token;
    // accessToken = result?.session.access_token;
    // await client.auth.setAuth(accessToken);
  }
  // @ts-ignore
  const { data, error } = await client
    .from("supacontent_content")
    // .select()
    .select(
      `
      *,
      content_type:content_type_id (
          project_id
      )
  `
    )
    // .filter("content_type.project_id", "eq", projectId);
  console.log(data, error);

  //   const data = new Uint8Array(Buffer.from("Hello Node.js"));
  writeFile("export.json", JSON.stringify(data), (err) => {
    if (err) throw err;
    console.log("The export to export.json is complete.");
  });
};
