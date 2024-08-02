import { createFileRoute, Outlet } from "@tanstack/react-router";
import { MainLayout } from "../components/Layouts/MainLayout/MainLayout";

export const Route = createFileRoute("/_main")({
  component: () => (
    <MainLayout>
      <Outlet />
    </MainLayout>
  ),
});
