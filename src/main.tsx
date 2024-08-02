import { StrictMode, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/global.scss";
import { routeTree } from "./routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/instance";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Suspense>
        <PrimeReactProvider>
          <RouterProvider router={router} />
        </PrimeReactProvider>
      </Suspense>
    </QueryClientProvider>
  </StrictMode>
);
