import { Button } from '@/components/ui/button';
import { useAdminDashboardContext } from '@/layouts/AdminDashboard';
import { Menu } from 'lucide-react';

const AdminTitle = ({ title }: { title: string }) => {
  const { setOpenDrawer } = useAdminDashboardContext() ?? {};
  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={() => setOpenDrawer && setOpenDrawer(true)}
        size="icon"
        variant="light"
        className="rounded-md lg:hidden"
      >
        <Menu />
      </Button>
      <h3 className="text-3xl font-bold text-h-black">{title}</h3>
    </div>
  );
};

export default AdminTitle;
