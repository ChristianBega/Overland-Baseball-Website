// ModalContext.js
import React, { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [cmsType, setCmsType] = useState(null);
  console.log(isModalOpen);

  const requestDelete = (content, type) => {
    setModalContent(content);
    setCmsType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  return <ModalContext.Provider value={{ isModalOpen, modalContent, requestDelete, closeModal, cmsType }}>{children}</ModalContext.Provider>;
};
