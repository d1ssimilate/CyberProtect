import { ReactNode, useContext } from "react";
import { Header } from "../../Header/Header";
import { Footer } from "../../Footer/Footer";
import { Modal } from "../../Modal/Modal";
import { DialogContext } from "../../DialogProvier/DialogProvider";

export function MainLayout({ children }: { children: ReactNode }) {
  const { data, nameModal, setDialog, title } = useContext(DialogContext);
  return (
    <div className="layout">
      <Header />
      <main className="main">{children}</main>
      <Footer />
      {nameModal && (
        <Modal
          data={data}
          title={title}
          nameModal={nameModal}
          setDialog={setDialog}
        />
      )}
    </div>
  );
}
