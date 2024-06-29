import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@ebloc/theme';
import { AlertCircleIcon, MoreVerticalIcon } from 'lucide-react';

export const CustomerMoreActions = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link" className="flex h-8 w-8 p-0 ring-0 focus-visible:ring-0">
          <MoreVerticalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>
          <AlertCircleIcon className="mr-2 h-4 w-4 transition-all text-red-500" />
          <span className="text-red-500">Disable customer</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
