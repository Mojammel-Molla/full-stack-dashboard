import { TConfig } from '@/types';
import { ReactNode } from 'react';
type TRoute = {
  path?: string;
  index?: boolean;
  element: ReactNode;
};

const routeGenerator = (config: TConfig[]) => {
  const routes = config?.map((item) => {
    const route: TRoute = { element: item.element };
    if (item?.path === '/') {
      route.index = true;
    } else {
      const path = item?.path?.split('/') ?? [];
      if (path.length > 2) {
        route.path = path[1] + '/' + path[2];
      } else {
        route.path = path[1];
      }
    }
    return route;
  });
  return routes;
};

export default routeGenerator;
