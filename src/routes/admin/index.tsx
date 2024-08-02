import { createFileRoute, redirect } from "@tanstack/react-router";
import { useCookie } from "../../hooks/useCookie";
import { MainLayout } from "../../components/Layouts/MainLayout/MainLayout";
import { AdminAuth } from "../../pages/Admin/AdminAuth";

export const Route = createFileRoute("/admin/")({
  beforeLoad: async () => {
    const { getCookie } = useCookie();
    if (getCookie("a"))
      throw redirect({ to: "/admin/dashboard", search: { tab: undefined } });
  },
  component: () => (
    <MainLayout>
      <AdminAuth />
    </MainLayout>
  ),
});
