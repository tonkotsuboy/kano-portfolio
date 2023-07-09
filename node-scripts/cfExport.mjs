import { exec } from "child_process";

import { config } from "dotenv";

config({
  path: `.env.local`,
});

const management_token =
  process.env.NEXT_PUBLIC_CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN;
const space_id = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;

exec(
  `contentful space export --config contentful/export-config.json --management-token ${management_token} --space-id ${space_id}`,
  (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  },
);
