import { createFileRoute } from "@tanstack/react-router";
import { MainLayout } from "../../components/Layouts/MainLayout/MainLayout";
import { AdminAuth } from "../../pages/Admin/AdminAuth";

export const Route = createFileRoute("/admin/")({
  component: () => (
    <MainLayout>
      <AdminAuth />
    </MainLayout>
  ),
});
