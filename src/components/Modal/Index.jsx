import React from 'react';
import { Overlay, ModalContent, CloseButton } from './styles.modal';

export default function Modal({ isOpen, onClose, children }) {
  return (
    <Overlay isOpen={isOpen} onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        {children}
      </ModalContent>
    </Overlay>
  );
}
