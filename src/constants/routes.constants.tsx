import Projects from '@/pages/Projects';
import { UsersIcon } from 'lucide-react';

export const admin_route_config = [
  {
    path: '/',
    element: <Projects />,
  },
  {
    path: '/users',
    label: 'Users',
    element: <Projects />,
    icon: UsersIcon,
  },
];
