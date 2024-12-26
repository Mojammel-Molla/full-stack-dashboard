import { useAppSelector } from '@/redux/hooks';
import { TUser } from '@/types/user.types';
import { useEffect, useState } from 'react';

const useUser = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [userInfo, setUserInfo] = useState<Partial<TUser>>({});

  useEffect(() => {
    if (user === null) {
      setUserInfo({});
    }
  }, [user]);

  return { ...userInfo };
};

export default useUser;
