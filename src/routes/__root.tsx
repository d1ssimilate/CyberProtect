import { createRootRoute, Outlet, useLocation } from "@tanstack/react-router";
import { NotFoundPage } from "../pages/NotFound/NotFound";
import { MainLayout } from "../components/Layouts/MainLayout/MainLayout";
import { useContext, useEffect } from "react";
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
  const { data, nameModal, setDialog, title, containerClassName } =
    useContext(DialogContext);
  const { pathname } = useLocation();
  useEffect(() => {
    setDialog("close");
  }, [pathname]);

  return (
    <>
      <Modal
        data={data}
        title={title}
        nameModal={nameModal}
        setDialog={setDialog}
        containerClassName={containerClassName}
      />
      <Outlet />
      <Toaster />
    </>
  );
};
