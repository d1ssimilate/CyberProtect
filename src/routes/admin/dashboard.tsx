import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "../../components/Layouts/AdminLayout/AdminLayout";
import { AdminDashboard } from "../../pages/Admin/AdminDashboard";

type DashboardTabs = {
  tab: string | undefined;
};

export const Route = createFileRoute("/admin/dashboard")({
  validateSearch: (search: Record<string, unknown>): DashboardTabs => {
    return { tab: search?.tab ? String(search?.tab) : undefined };
  },
  component: () => (
    <AdminLayout path={Route.fullPath}>
      <AdminDashboard />
    </AdminLayout>
  ),
});
