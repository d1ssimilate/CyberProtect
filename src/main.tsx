import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
import "./assets/styles/global.scss";
import { routeTree } from "./routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
