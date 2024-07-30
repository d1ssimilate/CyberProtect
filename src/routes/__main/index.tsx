import { createFileRoute } from "@tanstack/react-router";
import { MainPage } from "../../pages/Main/Main";

export const Route = createFileRoute("/__main/")({
  component: () => <MainPage />,
});
