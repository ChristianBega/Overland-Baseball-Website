import React, { createContext, useState, useContext } from "react";
import ModalComponent from "../../components/modals/modal";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalContent, setModalContent] = useState(null);

  const openModal = (content) => setModalContent(content);
  const closeModal = () => setModalContent(null);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <ModalComponent isOpen={!!modalContent} onToggle={closeModal}>
        {modalContent}
      </ModalComponent>
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
