import Blogs from '@/pages/Blogs';
import Experience from '@/pages/Experience';
import Projects from '@/pages/Projects';
import Skills from '@/pages/Skills';
import { Folders, List, Notebook, Rss } from 'lucide-react';

export const admin_route_config = [
  {
    path: '/',
    element: <Projects />,
  },
  {
    path: '/projects',
    label: 'Projects',
    element: <Projects />,
    icon: Folders,
  },
  {
    path: '/blogs',
    label: 'Blogs',
    element: <Blogs />,
    icon: List,
  },
  {
    path: '/experiences',
    label: 'Experiences',
    element: <Experience />,
    icon: Notebook,
  },
  {
    path: '/skills',
    label: 'Skills',
    element: <Skills />,
    icon: Rss,
  },
];
