import { createFileRoute, Outlet } from "@tanstack/react-router";
import { MainLayout } from "../components/Layouts/MainLayout/MainLayout";

type DashboardTabs = {
  recommendation: number | undefined;
};

export const Route = createFileRoute("/_main")({
  validateSearch: (search: Record<string, unknown>): DashboardTabs => {
    return {
      recommendation: search?.recommendation
        ? Number(search?.recommendation)
        : undefined,
    };
  },
  component: () => (
    <MainLayout>
      <Outlet />
    </MainLayout>
  ),
});
