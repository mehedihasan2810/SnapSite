import terser from "@rollup/plugin-terser";

export default {
  input: "src/main.js",
  output: [
    // {
    //   // file: "bundle.js",
    //   dir: "dist",
    //   format: "es",
    // },
    {
      // file: "bundle.min.js",
      dir: "dist",
      format: "es",
      name: "version",
      plugins: [terser()],
    },
  ],
};
