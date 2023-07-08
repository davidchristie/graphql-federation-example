import { build } from "esbuild";

export async function bundle(options: {
  inputFile: string;
  outputFile: string;
}) {
  const result = await build({
    entryPoints: [options.inputFile],
    bundle: true,
    platform: "node",
    format: "cjs",
    treeShaking: true,
    minify: true,
    sourcemap: true,
    outfile: options.outputFile,
  });
  console.log("Build complete:", JSON.stringify(result));
}
