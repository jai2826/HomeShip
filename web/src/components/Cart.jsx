import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MinusIcon,
  PlusIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import {load , notload} from './../../feature/Cart/loading'
import { cartToggle, emptyCart, setCartItems } from "../../feature/Cart/cart";
import { clearItem, clearCart, decreaseItem, setItem } from "./../../utils/CartUpdate";
import SyncLoader from "react-spinners/SyncLoader";

export default function Cart() {
  const cartVisible = useSelector((state) => state.cart.visible);
  const cartData = useSelector((state) => state.cart.data);
  const cartId = useSelector((state) => state.cart.cartId);
  const stateCart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();
  const loading = useSelector((state)=>state.cartLoader.value)

  const ClearCart = async ()=>{
    dispatch(load())
    const newdata = await clearCart(user.email);
    dispatch(emptyCart())
    dispatch(notload())
    
  }

  const DeleteItem = async (data) => {
    dispatch(load())
    const newdata = await clearItem(stateCart, data);
    dispatch(setCartItems(newdata.cart))
    dispatch(notload())
  };

  const DecreaseItem = async (data) => {
    // console.log(data)
    dispatch(load())
    const newdata = await decreaseItem(cartData, cartId , data);
    // console.log(data)
    dispatch(setCartItems(newdata.cart))
    dispatch(notload())
  };

  const IncreaseItem= async(data)=>{
    dispatch(load())
    const newdata = await setItem(cartData, cartId , data.product);
    // console.log(newdata);
    dispatch(setCartItems(newdata.cart));
    dispatch(notload())
  }


  return (
    <div
      className={`overflow-scroll fixed right-0 rounded-md border p-2 top-20  bg-white h-screen w-1/2 md:w-1/3  my-2 transition-all duration-[2000] z-20 transform ${
        cartVisible ? "translate-x-0 " : "translate-x-full "
      }`}
    >
      <div className="flex h-full w-full flex-col ">
        <div className="flex p-4 justify-between w-full items-center border rounded-md">
          <h1 className="flex text-2xl">My Cart</h1>
          <div className="flex space-x-4">
            <span onClick={() => ClearCart()}>
              <TrashIcon  className="h-6 w-6 cursor-pointer  hover:scale-150" />
            </span>
            <span onClick={() => dispatch(cartToggle())}>
              <XMarkIcon className="h-6 w-6 cursor-pointer hover:scale-150" />
            </span>
          </div>
        </div>
        <div className="flex p-4 flex-col">
          {cartData &&
            cartData.map((item) => {
              return (
                <div
                  key={item.id}
                  className="flex justify-between h-40 w-full space-x-2 border-b-2 rounded-md"
                >
                  <span className="h-full p-2 w-1/4 ">
                    <img
                      className="h-full w-full "
                      src={item.product.images[0].url}
                      alt="Product Image"
                    />
                  </span>
                  <span className="h-full w-3/4 p-2 ">
                    <div className="flex justify-between w-full h-10 ">
                      <h1 className="text-xl font-semibold">
                        {item.product.name}
                      </h1>

                      <TrashIcon
                        onClick={() => DeleteItem(item)}
                        className="h-6 w-6 cursor-pointer "
                      />
                    </div>
                    <p>Price: ₹{item.product.price}</p>
                    <div className="flex my-2 border w-fit rounded-xl divide-x [&>*]:border-black border-collapse border-black">
                      <PlusIcon onClick={()=>IncreaseItem(item)} className="h-8 w-8  rounded-l-xl cursor-pointer" />
                      <p className=" w-8 flex items-center justify-center font-semibold">
                        {" "}
                        {item.quantity}
                      </p>
                      <MinusIcon onClick={()=>DecreaseItem(item)}  className="h-8 w-8  rounded-r-xl cursor-pointer" />
                    </div>
                    <p>Total: {item.total}</p>
                  </span>
                </div>
              );
            })}
        </div>
        <div className="self-center">
          <SyncLoader loading={loading} color="#36d7b7" />
        </div>
      </div>
    </div>
  );
}
