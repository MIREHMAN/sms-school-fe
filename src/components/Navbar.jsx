// components/Navbar.jsx
import React, { useState } from "react";
import { useUser } from '@/context/UserContext';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import ManageAuth from "./ManageAuth";

const Navbar = () => {
  const { user } = useUser();
  const [authOpen, setAuthOpen] = useState(false);

  console.log(user)

  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-6 justify-end w-full">
        {user ? (
          <>
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
            <img src="/avatar.png" alt="User Avatar" width={36} height={36} className="rounded-full" />
          </>
        ) : (
          <>
            <button onClick={() => setAuthOpen(true)} className="bg-purple-500 text-white px-4 py-1 rounded text-sm">Login / Sign Up</button>
            <Dialog open={authOpen} onOpenChange={setAuthOpen}>
              <DialogContent className="sm:max-w-[450px]">
                <DialogHeader>
                  <DialogTitle>Welcome</DialogTitle>
                </DialogHeader>
                <ManageAuth onClose={() => setAuthOpen(false)} />
                <DialogFooter />
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
