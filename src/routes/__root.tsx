import { createRootRoute, Outlet } from "@tanstack/react-router";
import { NotFoundPage } from "../pages/NotFound/NotFound";
import { Layout } from "../components/Layout/Layout";

export const Route = createRootRoute({
  component: () => <Outlet />,
  notFoundComponent: () => (
    <Layout>
      <NotFoundPage />
    </Layout>
  ),
});
