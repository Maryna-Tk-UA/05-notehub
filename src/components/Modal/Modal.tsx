import { createPortal } from 'react-dom'
import css from './Modal.module.css'
import { useEffect } from 'react';
import NoteForm from '../NoteForm/NoteForm';

interface ModalProps {
  onClose: () => void;
}

function Modal({ onClose }: ModalProps) {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if(event.target === event.currentTarget) { // перевіряємо чи клацнули саме на бекдроп
      onClose();
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if(e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    }
  }, [onClose])

  return createPortal(
    <div
  className={css.backdrop}
  onClick={handleBackdropClick}
  role="dialog"
  aria-modal="true"
>
  <div className={css.modal}>
    <button
          className={css.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
    <NoteForm/>
  </div>
</div>,
document.body
  )
}

export default Modal