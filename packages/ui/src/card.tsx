import React from "react";

export function Card({
  title,
  children,
}: {
  title?: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <h2 className="text-xl font-semibold bg-gray-50 p-4 border-b">
        {title}
      </h2>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}

