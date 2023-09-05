"use client";

import { Toaster } from "react-hot-toast";

const ToasterContext = () => {
  return (
    <Toaster
      toastOptions={{
        style: {
          background: "#333",
          color: "#fff",
          fontWeight: "bold",
        },
      }}
    />
  );
};

export default ToasterContext;
