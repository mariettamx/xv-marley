import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const base = import.meta.env.BASE_URL; 
  const cleanedBasepath = base === '/' ? '/' : base.replace(/\/$/, ''); 

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    basepath: cleanedBasepath, 
  });

  return router;
};