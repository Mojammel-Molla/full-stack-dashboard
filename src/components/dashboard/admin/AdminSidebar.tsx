import { admin_route_config } from '@/constants/routes.constants';
import useUser from '@/hooks/useUser';
import { cn } from '@/lib/utils';
import { logout } from '@/redux/features/auth/auth.slice';
import { useAppDispatch } from '@/redux/hooks';
import { LogOut } from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../../../assets/m.me.large.png';

const AdminSidebar = () => {
  const sidebar_links = admin_route_config;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userData = useUser();

  const { email } = userData;

  const handleLogout = () => {
    if (!email) {
      return navigate('/login');
    } else if (email) {
      // Then, log out the user after invalidating the cache
      dispatch(logout());

      // Optionally, redirect to another page after logout
      navigate('/login');
    }
  };
  return (
    <div>
      <div className="border-b border-b-athens-gray-100 p-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="size-8 overflow-hidden">
            <img src={logo} alt="Logo" className="size-8 object-contain" />
          </div>
          <h1 className="text-xl font-medium text-h-black">{'[M]'}</h1>
        </Link>
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
                to={path}
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

export default AdminSidebar;
