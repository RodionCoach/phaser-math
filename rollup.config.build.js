import commonjs from "rollup-plugin-commonjs";
import replace from "@rollup/plugin-replace";
import { uglify } from "rollup-plugin-uglify";
import resolve from 'rollup-plugin-node-resolve';
import typescript from "rollup-plugin-typescript2";
import copy from "rollup-plugin-copy-assets";

export default {
  input: ["./src/index.ts"],

  output: {
    file: "./build/index.js",
    name: "math",
    format: "iife",
    sourcemap: false,
    intro: 'var global = window;'
  },

  plugins: [
    replace({
      "typeof CANVAS_RENDERER": JSON.stringify(true),
      "typeof WEBGL_RENDERER": JSON.stringify(true),
      "typeof EXPERIMENTAL": JSON.stringify(true),
      "typeof PLUGIN_CAMERA3D": JSON.stringify(false),
      "typeof PLUGIN_FBINSTANT": JSON.stringify(false),
      "typeof FEATURE_SOUND": JSON.stringify(true),
    }),

    resolve({
      extensions: [".ts", ".tsx"],
    }),

    commonjs({
      include: ["node_modules/eventemitter3/**", "node_modules/phaser/**"],
      exclude: ["node_modules/phaser/src/polyfills/requestAnimationFrame.js"],
      sourceMap: false,
      ignoreGlobal: true,
    }),

    typescript(),

    uglify({
      mangle: false,
    }),

    copy({
      assets: [
        "src/assets",
      ],
    })
  ],
};
