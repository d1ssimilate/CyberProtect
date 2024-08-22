import { Route } from "../../routes/admin/dashboard";
import { AdminSettings } from "./settings/AdminSettings";
import { AdminRecommendations } from "./recommendations/AdminRecommendations";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../components/Providers/AuthProvider/AuthProvider";

export function AdminDashboard() {
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (user.role) {
      if (user.role !== "admin") window.location.replace("/admin");
    }
  }, [user]);

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
