import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartToggle } from "../../feature/cart/cart";
import Cart from "./Cart";
import { logout } from "../../feature/Auth/user";
import { setProgress } from "../../feature/Page/loading";
import { notify } from "reapop";
import {
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";

export default function Navbar() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.data);
  const cartVisible = useSelector((state) => state.cart.visible);

  const handleLogout = () => {
    dispatch(setProgress(20));
    dispatch(logout());
    dispatch(setProgress(50));
    dispatch(
      notify({
        title: "User Logged Out",
        message: `Adios!! ${user.name}`,
        status: "info",
      })
    );
    dispatch(setProgress(75));
    if (cartVisible) dispatch(cartToggle());
    dispatch(setProgress(100));
  };

  const handleCart = () => {
    dispatch(cartToggle());
  };

  // const cartVisible = useSelector((state) => state.cart.visible);

  return (
    <nav className="top-0 sticky flex w-full h-20 p-2  justify-between bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500">
      <div className="max-w-fit flex p-4 border-2 rounded-md">
        <img src="/vite.svg" alt="Lggo" />
      </div>
      <div className="flex w-fit rounded-md ">
        <ul className="flex w-full items-center">
          <Link to="/">
            <li className="rounded-md  px-3  py-2 mx-3 text-xl font-semibold hover:bg-white">
              Home
            </li>
          </Link>
          <Link to="/">
            <li className="rounded-md  px-3  py-2 mx-3 text-xl font-semibold hover:bg-white">
              About us
            </li>
          </Link>
          <Link to="/products">
            <li className="rounded-md  px-3  py-2 mx-3 text-xl font-semibold hover:bg-white">
              Products
            </li>
          </Link>
          <Link to="/">
            <li className="rounded-md  px-3  py-2 mx-3 text-xl font-semibold hover:bg-white">
              Services
            </li>
          </Link>
          <Link to="/">
            <li className="rounded-md  px-3  py-2 mx-3 text-xl font-semibold hover:bg-white">
              Sell
            </li>
          </Link>

          <button onClick={handleCart}>
            <li className="rounded-md  px-3 py-2 mx-3 text-xl font-semibold hover:bg-white">
              Cart
            </li>
          </button>
          {<Cart />}
        </ul>
      </div>
      <div className="flex w-fit rounded-md ">
        <ul className="flex w-full items-center">
          {isLoggedIn ? (
            <button onClick={handleLogout}>
              <li className="flex items-center space-x-2 h-fit rounded-md px-3 py-2 mx-2 text-xl font-semibold hover:bg-white">
                <ArrowLeftOnRectangleIcon className="h-6 w-6" /> <p> Logout</p>
              </li>
            </button>
          ) : (
            <Link to="/auth/signin">
              <li className="rounded-md p-2 mx-2 text-xl font-semibold hover:bg-white">
                Signin
              </li>
            </Link>
          )}
          <Link to="/profile">
            <li className="flex items-center space-x-2 h-fit rounded-md px-3 py-2 mx-2 text-xl font-semibold hover:bg-white ">
              <UserCircleIcon className="h-6 w-6" /> <p> Profile</p>
            </li>
          </Link>
        </ul>
      </div>
      <div className="hidden self-center cursor-pointer p-2 border rounded-md ">
        <ul className="flex flex-col [&>*]:bg-white">
          <li className="h-0.5 w-8 my-1 "></li>
          <li className="h-0.5 w-8 my-1 "></li>
          <li className="h-0.5 w-8 my-1 "></li>
        </ul>
      </div>
    </nav>
  );
}
