import {
  user_profile_config,
  vendor_profile_config,
} from '@/constants/routes.constants';
import useUser from '@/hooks/useUser';
import { cn } from '@/lib/utils';
import { logout } from '@/redux/features/auth/auth.slice';
import { clearCart } from '@/redux/features/cart/cart.slice';
import { clearRecent } from '@/redux/features/recent/recent.slice';
import { useAppDispatch } from '@/redux/hooks';
import { LogOut } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';

const ProfileSidebar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userData = useUser();

  const { name, profilePhoto, email, role } = userData;

  const handleLogout = () => {
    dispatch(clearCart());
    dispatch(clearRecent());
    if (!role) {
      return navigate('/login');
    } else if (role) {
      // Then, log out the user after invalidating the cache
      dispatch(logout());

      // Optionally, redirect to another page after logout
      navigate('/login');
    }
  };

  const sidebar_links =
    role !== 'CUSTOMER' ? vendor_profile_config : user_profile_config;

  return (
    <div className="hidden shrink-0 space-y-4 lg:block lg:w-64">
      {/* Profile Info */}
      {profilePhoto ? (
        <div className="size-16 overflow-hidden">
          <img
            className={'size-full rounded-full object-cover'}
            src={profilePhoto}
            alt={name}
          />
        </div>
      ) : null}
      <div>
        <h5 className="text-lg font-bold text-h-black">{name}</h5>
        <span className="text-athens-gray-600">{email}</span>
      </div>

      {/* Profile Navigation Links */}
      <div className="space-y-2">
        {sidebar_links
          ?.filter((config) => config.label && config.icon)
          ?.map(({ label, icon: Icon, path }) => {
            return (
              <NavLink
                key={path}
                className={({ isActive }) =>
                  cn(
                    'group rounded-md px-3 py-2.5 flex items-center gap-2 text-athens-gray-600 transition-all hover:bg-athens-gray-50 active:bg-athens-gray-100/70 hover:text-athens-gray-950',
                    isActive ? 'bg-athens-gray-50 text-athens-gray-950' : ''
                  )
                }
                to={`/user${path}`}
              >
                {Icon && <Icon className="size-5" />}
                {label}
              </NavLink>
            );
          })}

        {/* Button for logout */}
        <button
          onClick={handleLogout}
          className="group flex w-full items-center gap-2 rounded-md px-3 py-2.5 text-athens-gray-600 transition-all hover:bg-rose-50 hover:text-rose-600 active:bg-athens-gray-100/70"
        >
          <LogOut className="size-5" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileSidebar;
