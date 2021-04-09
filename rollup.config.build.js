import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";
import copy from "rollup-plugin-copy-assets";

export default {
  input: ["./src/index.ts"],

  output: {
    file: "./build/index.js",
    name: "math",
    format: "iife",
    sourcemap: false,
    intro: "var global = window;",
  },

  plugins: [
    typescript(),

    terser(),

    copy({
      assets: ["src/assets", "src/index.html"],
    }),
  ],
};
