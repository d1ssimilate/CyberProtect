import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Layout } from "../components/Layout/Layout";

export const Route = createFileRoute("/__main")({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});
