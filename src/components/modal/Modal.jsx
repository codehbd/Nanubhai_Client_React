import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function Modal({ isOpen, onClose, children }) {
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-[80%] md:w-[50%] lg:w-[30%] relative">
        {children}

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          ✖
        </button>
      </div>
    </div>,
    document.body
  );
}
