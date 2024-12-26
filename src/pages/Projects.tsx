import AdminTitle from '@/components/dashboard/admin/AdminTitle';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ShieldCheck, Trash2 } from 'lucide-react';
import { TUser } from '@/types/user.types';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const actions = [
  {
    key: 'update',
    label: 'Update',
    icon: ShieldCheck,
  },
  {
    key: 'delete',
    label: 'Delete',
    icon: Trash2,
  },
];

const Projects = () => {
  const [page, setPage] = useState(1);

  const handleAction = async (key: string, user: TUser) => {};
  return (
    <div className="space-y-7">
      <div className="flex items-center justify-between">
        <AdminTitle title="Projects" />
        <Button
          type="submit"
          className="bg-red-500 hover:bg-red-400 active:bg-red-500"
        >
          Continue
        </Button>
      </div>
      <div className="block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="text-center">Email</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* ? Array.from({ length: 5 }).map((_, rowIndex) => ( */}
            <TableRow>
              <TableCell>
                <div className="h-4 w-24 animate-pulse rounded bg-athens-gray-300"></div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex w-full items-center justify-center">
                  <div className="h-4 w-16 animate-pulse rounded bg-athens-gray-300"></div>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex w-full items-center justify-end">
                  <div className="h-4 w-16 animate-pulse rounded bg-athens-gray-300"></div>
                </div>
              </TableCell>
            </TableRow>

            {/* <TableRow key={user._id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell className="text-center">{user.email}</TableCell>
                    <TableCell className="text-right">
                      <TableAction<TUser>
                        onClick={handleAction}
                        item={user}
                        actions={actions}
                      />
                    </TableCell>
                  </TableRow> */}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Projects;
