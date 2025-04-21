import React from "react";
import { Link, Outlet } from "react-router-dom";
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import logo from "/logo.png"; // adjust this if needed

const DashboardLayout = () => {
  return (
    <div className="h-screen flex">
      {/* LEFT */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4">
        <Link
          to="/"
          className="flex items-center justify-center lg:justify-start gap-2"
        >
          <img src={logo} alt="logo" width={32} height={32} />
          <span className="hidden lg:block font-bold">School SMS</span>
        </Link>
        <Menu />
      </div>

      {/* RIGHT */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-scroll flex flex-col">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
