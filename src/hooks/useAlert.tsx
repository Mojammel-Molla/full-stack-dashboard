import Alert from '@/components/Alert';
import { useState } from 'react';

export const useAlert = () => {
  const [alertConfig, setAlertConfig] = useState<{
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
  } | null>(null);

  const showAlert = (title: string, message: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setAlertConfig({
        title,
        message,
        onConfirm: () => {
          resolve(true);
          setAlertConfig(null);
        },
        onCancel: () => {
          resolve(false);
          setAlertConfig(null);
        },
      });
    });
  };

  const AlertComponent = alertConfig ? (
    <Alert
      title={alertConfig.title}
      message={alertConfig.message}
      onConfirm={alertConfig.onConfirm}
      onCancel={alertConfig.onCancel}
      open={!!alertConfig}
    />
  ) : null;

  return { showAlert, AlertComponent };
};
