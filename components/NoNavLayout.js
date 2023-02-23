import React from "react";

export function NoNavLayout({ children }) {
  return (
    <>
      <div className="bg-gray-100 h-screen p-10">
        <div className="container mx-auto h-full">{children}</div>
      </div>
    </>
  );
}
