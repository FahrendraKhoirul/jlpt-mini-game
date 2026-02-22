import type { ReactNode } from "react";

interface Props {
  isOpen: boolean;
  children: ReactNode;
}

export default function Modal({ isOpen, children }: Props) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-white/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-sm p-6 sm:p-8 rounded-[2rem] border-2 border-gray-400 shadow-[0_8px_0_0_rgba(0,0,0,0.3)]">
        {children}
      </div>
    </div>
  );
}
