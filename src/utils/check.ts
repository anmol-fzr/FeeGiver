import { envSchema } from "@/schema";
import { genTypeFile } from "./gen-types";

const rawEnv = import.meta.env;

envSchema
  .parseAsync(rawEnv)
  .then(() => {
    console.log("envs validated Successfully");
    genTypeFile();
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
