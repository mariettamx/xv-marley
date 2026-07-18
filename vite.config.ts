// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// export default defineConfig({
//   base: "/",
//   plugins: [],
// });


export default defineConfig({
  vite: {
    base: "/",
    build: {
      ssr: false
    },
    // Aquí es donde Vite sí reconoce y acepta la propiedad ssr
    ssr: {
      // Si es necesario pasar opciones específicas de SSR, van aquí,
      // pero con dejarlo vacío o con el build.ssr es suficiente.
    }
  }
});