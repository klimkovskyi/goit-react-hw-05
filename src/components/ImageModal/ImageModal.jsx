import s from "./ImageModal.module.css";
import Modal from "react-modal";

Modal.setAppElement("#root");

const ImageModal = ({ modalIsOpen, closeModal, image }) => {
  return (
    <div>
      <Modal
        className={s.modal}
        overlayClassName={s.overlay}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        {image && (
          <div className={s.imageContainer}>
            <img
              className={s.image}
              src={image.urls.regular}
              alt={image.alt_description}
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ImageModal;
