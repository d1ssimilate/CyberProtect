import { createFileRoute, redirect } from "@tanstack/react-router";
import { useCookie } from "../../hooks/useCookie";
import { AdminLayout } from "../../components/Layouts/AdminLayout/AdminLayout";
import { AdminDashboard } from "../../pages/Admin/AdminDashboard";

type DashboardTabs = {
  tab: string | undefined;
};

export const Route = createFileRoute("/admin/dashboard")({
  validateSearch: (search: Record<string, unknown>): DashboardTabs => {
    return { tab: search?.tab ? String(search?.tab) : undefined };
  },
  beforeLoad: async () => {
    const { getCookie } = useCookie();
    if (!getCookie("a")) throw redirect({ to: "/admin" });
  },
  component: () => (
    <AdminLayout path={Route.fullPath}>
      <AdminDashboard />
    </AdminLayout>
  ),
});
