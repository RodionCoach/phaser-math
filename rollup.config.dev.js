import commonjs from "rollup-plugin-commonjs";
import serve from "rollup-plugin-serve";
import resolve from "rollup-plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import copy from "rollup-plugin-copy-assets";
import babel from "rollup-plugin-babel";
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

    babel({ exclude: "node_modules/**", extensions: [".ts"] }),

    resolve({
      extensions: [".ts"],
    }),

    commonjs({
      include: ["node_modules/eventemitter3/**", "node_modules/phaser/**", "node_modules/**"],
      exclude: ["node_modules/phaser/src/polyfills/requestAnimationFrame.js"],
      sourceMap: true,
      ignoreGlobal: true,
    }),

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
