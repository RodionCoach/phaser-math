import serve from "rollup-plugin-serve";
import typescript from "rollup-plugin-typescript2";
import livereload from "rollup-plugin-livereload";
import path from "path";

export default {
  input: ["./src/index.ts"],

  output: {
    file: "./build/index.js",
    name: "math",
    format: "iife",
    sourcemap: true,
    intro: "var global = window;",
  },

  plugins: [
    typescript(),

    copy({
      assets: ["src/assets", "src/index.html"],
    }),

    serve({
      open: true,
      contentBase: "build",
      host: "localhost",
      port: 10001,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }),

    livereload({
      watch: path.resolve(__dirname, "build"),
      exts: ["html", "js"],
    }),
  ],
};
