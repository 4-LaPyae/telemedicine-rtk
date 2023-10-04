import { defineConfig, transformWithEsbuild } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [
    {
      name: "treat-js-files-as-jsx",
      async transform(code, id) {
        if (!id.match(/src\/.*\.js$/)) return null;
        return transformWithEsbuild(code, id, {
          loader: "jsx",
          jsx: "automatic",
        });
      },
    },
    react(),
  ],
  optimizeDeps: {
    // include: ["@mui/icons-material"],
    include: ["@mui/material/Tooltip"],
    // force: true,
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },
});
