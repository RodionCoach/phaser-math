import commonjs from "rollup-plugin-commonjs";
import replace from "@rollup/plugin-replace";
import { terser } from "rollup-plugin-terser";
import resolve from "rollup-plugin-node-resolve";
import copy from "rollup-plugin-copy-assets";

export default {
  input: ["./src/index.js"],

  output: {
    file: "./build/index.js",
    name: "math",
    format: "iife",
    sourcemap: false,
    intro: "var global = window;",
  },

  plugins: [
    replace({
      "typeof CANVAS_RENDERER": JSON.stringify(true),
      "typeof WEBGL_RENDERER": JSON.stringify(true),
      "typeof EXPERIMENTAL": JSON.stringify(true),
      "typeof PLUGIN_CAMERA3D": JSON.stringify(false),
      "typeof PLUGIN_FBINSTANT": JSON.stringify(false),
      "typeof FEATURE_SOUND": JSON.stringify(true),
      preventAssignment: true,
    }),

    resolve({
      extensions: [".js"],
    }),

    commonjs({
      include: ["node_modules/eventemitter3/**", "node_modules/phaser/**"],
      exclude: ["node_modules/phaser/src/polyfills/requestAnimationFrame.js"],
      sourceMap: false,
      ignoreGlobal: true,
    }),

    terser(),

    copy({
      assets: ["src/assets", "src/index.html"],
    }),
  ],
};
