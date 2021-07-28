import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";
import { MdClose } from "react-icons/md";

const modalRoot = document.querySelector("#modal-root");

export default function Modal({ showModal, children }) {
  const onUnmount = useRef(null);

  useEffect(() => {
    window.addEventListener("keydown", onUnmount.current);
  }, []);

  useEffect(() => {
    return () => {
      window.removeEventListener("keydown", onUnmount.current);
    };
  });

  onUnmount.current = (e) => {
    if (e.code === "Escape") {
      showModal();
    }
  };

  const closeModalbyClick = (e) => {
    if (e.currentTarget === e.target) {
      showModal();
    }
  };

  return createPortal(
    <div className={styles.backdrop} onClick={closeModalbyClick}>
      <button
        type="button"
        onClick={() => showModal()}
        className={styles.button}
      >
        <MdClose className={styles.icon} />
      </button>
      <div className={styles.modal}>{children}</div>
    </div>,
    modalRoot
  );
}
