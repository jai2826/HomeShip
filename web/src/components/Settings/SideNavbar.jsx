import React from "react";
import {
  BarChart,
  Wallet,
  Newspaper,
  BellRing,
  Paperclip,
  Brush,
  Wrench,
} from "lucide-react";
import { FiSettings, FiUser } from "react-icons/fi";
import { MdLibraryBooks, MdOutlinePayment } from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs";
import { Link } from "react-router-dom";

export function SideNavbar() {
  return (
    <aside className="flex h-screen w-80 flex-col overflow-y-auto bg-white px-5 py-8">
      <span className="flex w-full justify-between items-center">
        <h1 className="text-2xl font-bold">Settings</h1>
        <FiSettings className="h-5 w-5" />
      </span>
      <div className="mt-6 flex flex-1 flex-col justify-between">
        <nav className="-mx-3 space-y-6 ">
          <div className="space-y-3 ">
            <Link
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              to={"/settings/profile"}
            >
              <FiUser className="h-5 w-5"/>
              <span className="mx-2 text-sm font-medium">Profile</span>
            </Link>
            <Link
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="#"
            >
              
              <MdLibraryBooks className="h-5 w-5"/>
              <span className="mx-2 text-sm font-medium">Accounts</span>
            </Link>
            <Link
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="#"
            >
              <BsBoxSeam className="h-5 w-5"/>
              <span className="mx-2 text-sm font-medium">Orders</span>
            </Link>
            <Link
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="#"
            >
              <MdOutlinePayment className="h-5 w-5"/>
              <span className="mx-2 text-sm font-medium">Payments</span>
            </Link>
            <Link
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              to={'/settings/addresses'}
            >
              <MdOutlinePayment className="h-5 w-5"/>
              <span className="mx-2 text-sm font-medium">Addresses</span>
            </Link>
          </div>
        </nav>
      </div>
    </aside>
  );
}
