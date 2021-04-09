import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";
import copy from "rollup-plugin-copy";

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
      targets: [
        {
          src: "src/assets",
          dest: "build",
        },
        {
          src: "src/index.html",
          dest: "build",
        },
      ],
      copyOnce: true,
    }),
  ],
};
