import React from "react";
import { useUser } from '@/context/UserContext';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { user, logout } = useUser();

  if (!user) return null; // Show nothing if not logged in

  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-6 justify-end w-full">
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
          <img src="/message.png" alt="Messages" width={20} height={20} />
        </div>
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative">
          <img src="/announcement.png" alt="Notifications" width={20} height={20} />
          <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-purple-500 text-white rounded-full text-xs">1</div>
        </div>

        <div className="flex flex-col">
          <span className="text-xs leading-3 font-medium">{user?.username}</span>
          <span className="text-[10px] text-gray-500 text-right">{user?.role}</span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <img
              src="/avatar.png"
              alt="User Avatar"
              width={36}
              height={36}
              className="rounded-full cursor-pointer"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem disabled className="text-xs text-gray-500">
              {user?.username}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={logout}
              className="text-red-600 hover:bg-red-100 cursor-pointer"
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
