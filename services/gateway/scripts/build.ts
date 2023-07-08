import { bundle } from "node-bundler";

await bundle({
  inputFile: "scripts/start.ts",
  outputFile: "build/start.cjs",
});
