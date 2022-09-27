import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";

const config = {
  input: "src/index.tsx",
  output: {
    file: pkg.main,
    format: "cjs",
    sourcemap: true,
    globals: {
      react: "React",
      "react-dom": "ReactDOM",
    },
  },
  plugins: [
    typescript({ useTsconfigDeclarationDir: true }),
    peerDepsExternal(),
    commonjs({
      include: "node_modules/**",
    }),
    resolve(),
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
};

export default config;
