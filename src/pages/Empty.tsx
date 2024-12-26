import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md overflow-hidden">
        <img
          className="w-full object-contain"
          src="https://i.ibb.co/z7K4Rjg/Group-123-1.png"
          alt="404 Not Found"
        />
      </div>
      <div className="mt-8 space-y-4 text-center">
        <h1 className="text-2xl font-semibold text-dark-blue-900">
          Oops! We couldn't find what you're looking for.
        </h1>
        <p className="text-base text-gray-600">
          The page you are trying to access might have been moved, deleted, or
          doesn't exist.
        </p>
        <Button onClick={() => navigate('/')}>Return to Home</Button>
      </div>
    </div>
  );
};

export default NotFound;
