import { createRootRoute, Outlet } from "@tanstack/react-router";
import { NotFoundPage } from "../pages/NotFound/NotFound";
import { MainLayout } from "../components/Layouts/MainLayout/MainLayout";
import { useContext } from "react";
import { DialogContext } from "../components/Providers/DialogProvier/DialogProvider";
import { Toaster } from "react-hot-toast";
import { Modal } from "../components/UI/Modal/Modal";

export const Route = createRootRoute({
  component: () => <InnerApp />,
  notFoundComponent: () => (
    <MainLayout>
      <NotFoundPage />
    </MainLayout>
  ),
});
const InnerApp = () => {
  const { data, nameModal, setDialog, title } = useContext(DialogContext);
  return (
    <>
      {nameModal && (
        <Modal
          data={data}
          title={title}
          nameModal={nameModal}
          setDialog={setDialog}
        />
      )}
      <Outlet />
      <Toaster />
    </>
  );
};
