import { useAppSelector } from '@/redux/hooks';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';

const ProtectedRoute = ({ children }: { children: ReactNode }): JSX.Element => {
  const token = useAppSelector((state) => state?.auth.token);

  if (!token) {
    toast.error('You are not authorized.');
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
