import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@Components": path.resolve(__dirname, "src/Components"),
      "@Store": path.resolve(__dirname, "src/Redux/Store/store.jsx"),
      "@Slice": path.resolve(__dirname, "src/Redux/Slice"),
      "@Pages": path.resolve(__dirname, "src/Pages"),
      "@Routes": path.resolve(__dirname, "src/Routes"),
      "@Assets": path.resolve(__dirname, "src/Assets"),
      "@HttpRequest": path.resolve(
        __dirname,
        "src/Adapters/Remote/HttpRequest.jsx"
      ),
      "@Adapters": path.resolve(__dirname, "src/Adapters/index.jsX"),
      "@Hooks": path.resolve(__dirname, "src/Hooks"),
      "@Middleware": path.resolve(__dirname, "src/Middleware"),
      "@Constant": path.resolve(__dirname, "src/Constant"),
      "@Styles": path.resolve(__dirname, "src/Css"),
      "@Utils": path.resolve(__dirname, "src/Utils"),
      "@PackageJson": path.resolve(__dirname, "package.json"),
    },
  },
  build: {
    // Configuración de construcción...
    minify: true,
    assetsInclude: [
      // Excluir carpetas específicas
      "!src/Build/**/*",
      "!src/Constant/Params.json",
      "!src/Constant/Key.json",
      "!src/Constant/Routes.json",
    ],
  }
});
