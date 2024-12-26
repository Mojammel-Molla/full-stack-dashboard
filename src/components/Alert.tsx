import React from 'react';
import ReactDOM from 'react-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { TriangleAlert } from 'lucide-react';
import { Button } from './ui/button';

type AlertProps = {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  open: boolean;
};

const Alert: React.FC<AlertProps> = ({ title, message, onConfirm, onCancel, open }) => {
  if (!open) return null;

  return ReactDOM.createPortal(
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="max-w-96">
        <DialogHeader>
          <DialogTitle hidden></DialogTitle>
          <DialogDescription hidden></DialogDescription>
          <div className="space-y-5 text-center">
            <div className="flex flex-col items-center space-y-1">
              <div className="flex size-20 items-center justify-center rounded-md bg-red-50 text-4xl text-red-500">
                <TriangleAlert />
              </div>
              <h4 className="text-xl font-semibold">{title}</h4>
              <p className="text-athens-gray-600">{message}</p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Button
                onClick={onCancel}
                className="bg-slate-200 text-slate-600 hover:bg-slate-200/80 active:bg-slate-200"
              >
                Cancel
              </Button>
              <Button
                onClick={onConfirm}
                className="bg-red-500 hover:bg-red-400 active:bg-red-500"
              >
                Continue
              </Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>,
    document.body // Render modal in the portal
  );
};

export default Alert;
