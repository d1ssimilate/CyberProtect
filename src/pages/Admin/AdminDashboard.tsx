import { Route } from "../../routes/admin/dashboard";
import { AdminRecommendations } from "./recommendations/AdminRecommendations";

export function AdminDashboard() {
  const { tab } = Route.useSearch();

  function getComponent() {
    switch (tab) {
      case "recommendations":
        return <AdminRecommendations />;

      default:
        return <AdminRecommendations />;
    }
  }
  return getComponent();
}
