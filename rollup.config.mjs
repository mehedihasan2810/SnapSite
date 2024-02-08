import terser from '@rollup/plugin-terser';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'es',
    },
    {
      file: 'dist/index.min.js',
      format: 'iife',
      name: 'snapSite',
      plugins: [terser()],
    },
  ],
};
