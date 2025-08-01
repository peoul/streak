import "./Modal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-content-header">
          <h1>{title}</h1>
          <button className="modal-close" onClick={onClose}>
            x
          </button>
        </div>
        <hr></hr>
        {children}
      </div>
    </div>
  );
};

export default Modal;
