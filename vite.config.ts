import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import DefineOptions from "unplugin-vue-define-options/vite";

export default defineConfig({
  plugins: [
    vue(),
    dts({
      entryRoot: "./src",
      outputDir: ["./dist/es/src", "./dist/lib/src"],
      tsConfigFilePath: "tsconfig.json",
    }),
    DefineOptions(),
  ],
});