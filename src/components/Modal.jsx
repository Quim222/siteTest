import { Button } from '@headlessui/react';
import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-lg w-full h-[50%] overflow-auto">
        <Button
          onClick={() => {onClose()}}
          className="absolute top-0 right-0 mt-4 mr-4 text-gray-700 bg-orange-400 rounded-lg size-9 hover:text-white"
        >
          X
        </Button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
