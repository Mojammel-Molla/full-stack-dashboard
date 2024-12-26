import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { EllipsisVertical, LucideProps } from 'lucide-react';

type TTableAction<T> = {
  actions: {
    key: string;
    label: string;
    icon: React.ForwardRefExoticComponent<
      Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
    >;
  }[];
  onClick: (key: string, item:T) => void;
  item: T;
};

const TableAction = <T,>({ actions, onClick, item }: TTableAction<T>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='outline-none'>
        <Button variant="light" size="icon" className="rounded-md">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="bottom">
        {actions?.map(({ key, label, icon: Icon }) => (
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => onClick(key, item)}
            key={key}
          >
            <Icon /> {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableAction;
