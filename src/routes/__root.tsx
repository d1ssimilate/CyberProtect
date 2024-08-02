import { createRootRoute, Outlet } from "@tanstack/react-router";
import { NotFoundPage } from "../pages/NotFound/NotFound";
import { MainLayout } from "../components/Layouts/MainLayout/MainLayout";

export const Route = createRootRoute({
  component: () => <Outlet />,
  notFoundComponent: () => (
    <MainLayout>
      <NotFoundPage />
    </MainLayout>
  ),
});
