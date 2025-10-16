import React, { createContext, useContext, useState, ReactNode } from "react";

type ToastType = "success" | "danger" | "info" | "warning";
type Toast = { id: number; type: ToastType; message: string };

type ToastContextT = {
  push: (toast: Omit<Toast, "id">) => void;
};

const ToastContext = createContext<ToastContextT | undefined>(undefined);

export function useToasts() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToasts must be used inside ToastProvider");
  }
  return ctx;
}

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = (toast: Omit<Toast, "id">) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`alert alert-${t.type}`}
            style={{
              minWidth: 250,
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              borderRadius: "8px",
            }}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
