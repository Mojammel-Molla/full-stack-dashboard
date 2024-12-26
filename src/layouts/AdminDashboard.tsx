import AdminSidebar from '@/components/dashboard/admin/AdminSidebar';
import { DrawerContent, Drawer } from '@/components/ui/drawer';
import { createContext, useContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
type TContext = {
  openDrawer: boolean;
  setOpenDrawer: (key: boolean) => void;
};

const AdminDashboardContext = createContext<TContext | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useAdminDashboardContext = () => {
  const context = useContext(AdminDashboardContext);
  if (!context) {
    return;
  }
  return context as TContext;
};
const AdminDashboard = () => {
  const [open, setOpen] = useState(false);

  return (
    <AdminDashboardContext.Provider
      value={{ openDrawer: open, setOpenDrawer: setOpen }}
    >
      <div className="relative mx-auto max-w-screen-2xl">
        <div className="fixed inset-y-0 hidden w-64 bg-white lg:block">
          <AdminSidebar />
        </div>
        <div className="ml-0 min-h-screen bg-athens-gray-50 p-10 lg:ml-64">
          <Outlet />
        </div>
      </div>

      <Drawer open={open} onOpenChange={setOpen} direction="left">
        <DrawerContent className="left-0 top-0 my-0 w-64 flex-col items-start rounded-none">
          <div className="w-full">
            <AdminSidebar />
          </div>
        </DrawerContent>
      </Drawer>
    </AdminDashboardContext.Provider>
  );
};

export default AdminDashboard;
