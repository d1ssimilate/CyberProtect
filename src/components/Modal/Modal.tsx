import { Dispatch, PropsWithChildren, SetStateAction, useEffect } from "react";
import { modalAnimations } from "./Modal.animatios";
import styles from "./Modal.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { CrossIcon } from "../Icons/CrossIcon";

interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  number: number;
  title: string;
}

export function Modal(props: ModalProps) {
  useEffect(() => {
    window.document.body.style.overflow = props.isOpen ? "hidden" : "unset";
  }, [props.isOpen]);

  function ModalContent() {
    return (
      <motion.div className={styles.modal} {...modalAnimations.root}>
        <motion.div className={styles.inner} {...modalAnimations.content}>
          <div className={styles.content}>
            <CrossIcon
              onClick={() => props.setIsOpen(false)}
              className={styles.close}
            />
            <div className={styles.head}>
              <div data-number={props.number} className={styles.number} />
              <p className={styles.title}>{props.title}</p>
            </div>
            <div>{props.children}</div>
          </div>
        </motion.div>
        <div
          onClick={() => props.setIsOpen(false)}
          className={styles.background}
        />
      </motion.div>
    );
  }
  return createPortal(
    <AnimatePresence>{props.isOpen && <ModalContent />}</AnimatePresence>,
    document.getElementById("root")!
  );
}
