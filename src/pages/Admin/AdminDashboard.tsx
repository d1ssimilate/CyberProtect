import { Route } from "../../routes/admin/dashboard";
import { AdminSettings } from "./settings/AdminSettings";
import { AdminRecommendations } from "./recommendations/AdminRecommendations";

export function AdminDashboard() {
  const { tab } = Route.useSearch();

  function getComponent() {
    switch (tab) {
      case "recommendations":
        return <AdminRecommendations />;
      case "settings":
        return <AdminSettings />;

      default:
        return <AdminRecommendations />;
    }
  }
  return getComponent();
}
