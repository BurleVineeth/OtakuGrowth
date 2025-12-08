import AlertModal, { type AlertVariant } from "@/components/ui/AlertModal";
import { createContext, useContext, useState } from "react";

interface AlertOptions {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: AlertVariant;
  onConfirm?: () => void;
}

interface AlertContextType {
  openAlert: (options: AlertOptions) => void;
}

const AlertContext = createContext<AlertContextType>({
  openAlert: () => {},
});

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [alertData, setAlertData] = useState<AlertOptions | null>(null);

  const openAlert = (options: AlertOptions) => {
    setAlertData(options);
  };

  const closeAlert = () => {
    setAlertData(null);
  };

  const handleConfirm = () => {
    alertData?.onConfirm?.();
    closeAlert();
  };

  return (
    <AlertContext.Provider value={{ openAlert }}>
      {children}

      <AlertModal
        open={!!alertData}
        variant={alertData?.variant}
        title={alertData?.title}
        message={alertData?.message}
        confirmText={alertData?.confirmText}
        cancelText={alertData?.cancelText}
        onConfirm={handleConfirm}
        onCancel={closeAlert}
      />
    </AlertContext.Provider>
  );
};
