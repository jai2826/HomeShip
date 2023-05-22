import { HeartIcon, ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { utilToggle } from "../../../feature/Page/utils";
import Cart from "./Cart";

const RightUtils = () => {
  const dispatch = useDispatch();
  const cartVisible = useSelector((state) => state.cart.visible);
  const UtilVisible = useSelector((state)=> state.util.visible)
  const [activeUtil, setActiveUtil] = useState("Cart");
  const handleCart = () => {
    setActiveUtil("Cart");
  };
  const handleWishlist = () => {
    setActiveUtil("Wishlist");
  };
  return (
    <div
      className={`overflow-scroll fixed right-0 rounded-md border p-2 top-20  bg-white h-full w-1/2 md:w-1/4  my-2 transition-all duration-[2000] z-20 transform ${
        UtilVisible ? "translate-x-0 " : "translate-x-full "
      }`}
    >
      <div className="px-2 pt-2 rounded-md flex justify-between  bg-purple-500 ">
        <span>

        <button
          type="button"
          onClick={handleCart}
          className={`px-2 py-1 pb-2 rounded-t-md ${
            activeUtil === "Cart" && "bg-white"
          }`}
          >
          <ShoppingCartIcon className="h-6 w-6" />
        </button>

        <button
          type="button"
          onClick={handleWishlist}
          className={`px-2 py-1 pb-2 rounded-t-md ${
            activeUtil === "Wishlist" && "bg-white"
          }`}
          >
          <HeartIcon className="h-6 w-6" />
        </button>
          </span>
        <button
          type="button"
          onClick={() => dispatch(utilToggle())}
          className={` px-2 py-1 pb-2 rounded-t-md `}
        >
          
          <XMarkIcon className="h-6 w-6" />
        </button>
        
      </div>
      <div>
        {activeUtil === 'Cart' && <Cart/>}
      </div>

    </div>
  );
};
export default RightUtils;
