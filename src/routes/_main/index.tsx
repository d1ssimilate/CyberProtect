import { createFileRoute } from "@tanstack/react-router";
import { MainPage } from "../../pages/Main/Main";

export const Route = createFileRoute("/_main/")({
  component: () => <MainPage />,
});
