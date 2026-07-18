import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const base = env.GITHUB_PAGES_BASE_PATH || env.VITE_BASE_URL || "/";

  return {
    base,
    plugins: [react(), tsconfigPaths(), tailwindcss()],
  };
});