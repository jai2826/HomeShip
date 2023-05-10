import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AuthNavbar() {
  const location = useLocation();
  const [page, setPage] = useState("/auth/signin");
  useEffect(() => {
    setPage(location.pathname);
  }, []);

  return (
    <div className="flex w-full  h-20 p-2 justify-between bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500">
      <div className="w-fit flex p-4 border-2 rounded-md">
        <img src="/vite.svg" alt="Logo" />
      </div>
      <div className="flex items-center h-full w-1/6 justify-evenly px-4 text-xl ">
        {page === "/auth/signin" && (
          <Link
            to={"/auth/signup"}
            className="flex w-fit h-4/5 items-center p-2  hover:bg-white space-x-2 rounded-md font-semibold"
          >
            <li className="">Signup</li>
          </Link>
        )}
        {page === "/auth/signup" && (
          <Link
            to={"/auth/signin"}
            className="flex w-fit h-4/5 items-center p-2  hover:bg-white space-x-2 rounded-md font-semibold"
          >
            <li className="">Signin</li>
          </Link>
        )}
        <Link
          to={"/"}
          className="flex w-fit h-4/5 items-center p-2  hover:bg-white space-x-2 rounded-md font-semibold"
        >
          <ArrowLeftCircleIcon className="h-8 w-8  " />
          <li className="">Go Back</li>
        </Link>
      </div>
    </div>
  );
}
