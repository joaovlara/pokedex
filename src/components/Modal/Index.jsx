import React from 'react';
import { Overlay, ModalContent } from './styles.Modal';


export default function Modal({ isOpen, onClose, children }) {
  return (
    <Overlay isOpen={isOpen} onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {children}
        <button onClick={onClose} style={{ marginTop: '1rem' }}>Fechar</button>
      </ModalContent>
    </Overlay>
  );
}
