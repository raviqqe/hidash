import { defineConfig } from "@rslib/core";

export default defineConfig({
  lib: [
    {
      dts: true,
      format: "esm",
      output: {
        minify: true,
      },
      syntax: "esnext",
    },
  ],
  source: {
    entry: {
      csv: "./src/csv.ts",
      json: "./src/json.ts",
      string: "./src/string.ts",
    },
  },
});
