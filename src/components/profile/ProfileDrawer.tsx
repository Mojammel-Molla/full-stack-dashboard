import { Drawer, DrawerContent, DrawerHeader } from '@/components/ui/drawer';
import { Link, useNavigate } from 'react-router-dom';
import {
  vendor_profile_config,
  user_profile_config,
} from '@/constants/routes.constants';
import useUser from '@/hooks/useUser';
import { logout } from '@/redux/features/auth/auth.slice';
import { useAppDispatch } from '@/redux/hooks';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LogOut } from 'lucide-react';
import { clearCart } from '@/redux/features/cart/cart.slice';
import { clearRecent } from '@/redux/features/recent/recent.slice';

const ProfileDrawer = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: ((open: boolean) => void) | undefined;
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userData = useUser();

  const { role } = userData;

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
    <Drawer open={open} onOpenChange={setOpen} direction="left">
      <DrawerContent className="left-0 top-0 my-0 w-64 flex-col items-start rounded-none">
        <DrawerHeader>
          <Link to="/" className="flex items-center gap-2">
            <div className="size-8 overflow-hidden">
              <img
                className="size-full object-contain"
                src="https://i.ibb.co.com/PTSxVm0/hekto-logo.png"
                alt="Hekto Logo"
              />
            </div>
            <h2 className="text-3xl font-bold text-h-black">Hekto</h2>
          </Link>
        </DrawerHeader>
        <div className="w-full p-5">
          <div className="space-y-2">
            {sidebar_links
              ?.filter((config) => config.label && config.icon)
              ?.map(({ label, icon: Icon, path }) => {
                return (
                  <NavLink
                    onClick={() => setOpen && setOpen(false)}
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
      </DrawerContent>
    </Drawer>
  );
};

export default ProfileDrawer;
