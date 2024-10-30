import { envSchema } from "./src/schema";

const rawEnv = import.meta.env;

envSchema
  .parseAsync(rawEnv)
  .then(() => {
    console.log("envs validated Successfully");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
