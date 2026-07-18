import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  // Removemos la barra diagonal del final si existe (ej. "/repo/" pasa a "/repo")
  // Si es solo "/", lo dejamos como una cadena vacía "" para que TanStack lo entienda bien
  const base = import.meta.env.BASE_URL;
  const cleanedBasepath = base === '/' ? '/' : base.replace(/\/$/, '');

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    basepath: cleanedBasepath, // ◄--- Usamos la ruta limpia sin el '/' al final
  });

  return router;
};