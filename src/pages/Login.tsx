import HForm from '@/components/form/HForm';
import HInput from '@/components/form/HInput';
import { Button } from '@/components/ui/button';
import { useLogInMutation } from '@/redux/features/auth/auth.api';
import { useEffect } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useAppDispatch } from '@/redux/hooks';
import { login } from '@/redux/features/auth/auth.slice';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loginFromServer, { data, isLoading, isSuccess }] = useLogInMutation();

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const result = await loginFromServer(data);
    if (result?.error) {
      toast.error(
        (result?.error as { data: { message: string } })?.data?.message
      );
    }
  };

  useEffect(() => {
    if (isSuccess && !isLoading) {
      const user = jwtDecode(data.data.token);
      dispatch(login({ user, token: data.data.token }));
      navigate('/');
    }
  }, [isSuccess, isLoading, data, dispatch, navigate]);

  return (
    <div>
      <div className="container flex items-center justify-center">
        <div className="min-w-96 space-y-6 border border-athens-gray-100 p-7">
          <div className="space-y-1.5">
            <h4 className="text-center text-xl font-bold text-h-black">
              Login
            </h4>
            <p className="text-center text-athens-gray-600">
              Please login using account detail bellow.
            </p>
          </div>
          <HForm onSubmit={handleSubmit}>
            <div className="space-y-4">
              <HInput placeholder="Email Address" name="email" />
              <HInput placeholder="Password" name="password" />
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
                size="lg"
              >
                {isLoading ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  'Login'
                )}
              </Button>
            </div>
          </HForm>
        </div>
      </div>
    </div>
  );
};

export default Login;
