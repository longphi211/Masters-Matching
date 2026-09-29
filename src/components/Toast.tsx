import React from 'react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#001026] text-white px-4 py-2.5 rounded-full text-xs font-bold shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
      <span className="material-symbols-outlined text-[18px] text-[#4edea3]">check_circle</span>
      <span>{message}</span>
      <button onClick={onClose} className="ml-1 text-white/70 hover:text-white">
        <span className="material-symbols-outlined text-[14px]">close</span>
      </button>
    </div>
  );
};
