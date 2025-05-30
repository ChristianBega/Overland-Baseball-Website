import React, { createContext, useState, useContext } from "react";
import { ModalComponent } from "..";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
const ModalContext = createContext({
  openModal: () => {},
  closeModal: () => {},
  closeAllModals: () => {},
  preview: null,
  setPreview: () => {},
  file: null,
  setFile: () => {},
});

const ModalProvider = ({ children }) => {
  const [modalContent, setModalContent] = useState([]);
  const [preview, setPreview] = useState(null); // Image preview state
  const [file, setFile] = useState(null); // File state
  const [modalType, setModalType] = useState(null);

  const openModal = (content, modalType, onClose) => {
    setModalContent((prevStack) => [...prevStack, { content, onClose }]);
    setModalType(modalType);
  };

  const closeModal = () => {
    setModalContent((prevStack) => {
      const newStack = prevStack.slice(0, -1);
      if (newStack.length === 0) {
        setPreview(null);
      }
      return newStack;
    });
  };

  const closeAllModals = () => {
    setModalContent([]);
    setPreview(null);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ModalContext.Provider value={{ openModal, closeModal, closeAllModals, preview, setPreview, file, setFile }}>
        {children}
        {modalContent.map(({ content, onClose }, index) => (
          <ModalComponent modalType={modalType} key={index} isOpen={true} onToggle={() => closeModal()} onClose={onClose} zIndex={1000 + index}>
            {content}
          </ModalComponent>
        ))}
      </ModalContext.Provider>
    </QueryClientProvider>
  );
};
export default ModalProvider;

export const useModal = () => useContext(ModalContext);
