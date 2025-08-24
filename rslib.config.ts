import { defineConfig } from "@rslib/core";

export default defineConfig({
  lib: [
    {
      dts: true,
      format: "esm",
      output: {
        minify: true,
      },
    },
  ],
  source: {
    entry: {
      csv: "./src/csv.ts",
      json: "./src/json.ts",
      string: "./src/string.ts"
    },
  },
});
