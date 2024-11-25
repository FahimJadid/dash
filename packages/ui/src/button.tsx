"use client";

import { ReactNode, MouseEvent } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type="button"
      // className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      className="
      w-full text-left block px-3 py-2 rounded-md text-base font-medium hover:bg-[#5B55D6]
      md:inline-flex md:items-center md:justify-center md:bg-white md:text-[#4942CE] md:hover:bg-[#E6E5FF] md:px-4 md:py-2 md:rounded-md md:text-sm md:font-medium
    "
    >
      {children}
    </button>
  );
};

