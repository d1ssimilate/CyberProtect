import { PropsWithChildren, useRef } from "react";
import { modalAnimations } from "./Modal.animatios";
import styles from "./Modal.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { CrossIcon } from "../Icons/CrossIcon";
import { RecommendationEditDialog } from "../Dialog/RecommendationEdit";
import { RecommendationDialog } from "../Dialog/Recommendation/Recommendation";

interface ModalProps extends PropsWithChildren {
  nameModal: string;
  data: any;
  title: string;
  setDialog: (nameModal: string) => void;
}

export function Modal(props: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  function ModalContent() {
    return (
      <motion.div className={styles.modal} {...modalAnimations.root}>
        <motion.div
          ref={modalRef}
          className={styles.inner}
          {...modalAnimations.content}
        >
          <div className={styles.content}>
            <CrossIcon
              onClick={() => props.setDialog("close")}
              className={styles.close}
            />
            <div className={styles.head}>
              {props.data?.number && (
                <div
                  data-number={props.data.number}
                  className={styles.number}
                />
              )}

              <p
                style={props.data?.number ? {} : { marginTop: "20px" }}
                className={styles.title}
              >
                {props.title}
              </p>
            </div>
            {props.nameModal === "RecommendationEdit" ? (
              <RecommendationEditDialog />
            ) : props.nameModal === "Recommendation" ? (
              <RecommendationDialog />
            ) : (
              ""
            )}
          </div>
        </motion.div>
        <div
          onClick={() => props.setDialog("close")}
          className={styles.background}
        />
      </motion.div>
    );
  }
  return createPortal(
    <AnimatePresence>{props.nameModal && <ModalContent />}</AnimatePresence>,
    document.getElementById("root")!
  );
}
