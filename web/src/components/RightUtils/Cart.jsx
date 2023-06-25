import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { load, notload } from "../../../feature/Cart/loading";
import {
  cartToggle,
  emptyCart,
  setCartItems,
} from "../../../feature/Cart/cart";
import {
  clearItem,
  clearCart,
  decreaseItem,
  setItem,
} from "../../../utils/CartUpdate";
import BarLoader from "react-spinners/BarLoader";

import React from "react";

export default function CartThree() {
  const spinnerOverride = {
    width: "100%",
  };
  const cartData = useSelector((state) => state.cart.data);
  const cartId = useSelector((state) => state.cart.cartId);
  const stateCart = useSelector((state) => state.cart);
  const User = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.cartLoader.value);

  const ClearCart = async () => {
    dispatch(load());
    const newdata = await clearCart(User.email);
    dispatch(emptyCart());
    dispatch(notload());
  };

  const DeleteItem = async (data) => {
    dispatch(load());
    const newdata = await clearItem(stateCart, data, User.email);
    dispatch(setCartItems(newdata.cart));
    dispatch(notload());
  };

  const DecreaseItem = async (data) => {
    // console.log(data)
    dispatch(load());
    const newdata = await decreaseItem(cartData, cartId, data,User.email);
    // console.log(data)
    dispatch(setCartItems(newdata.cart));
    dispatch(notload());
  };

  const IncreaseItem = async (data) => {
    dispatch(load());
    // console.log(data);
    const newdata = await setItem(cartData, cartId, data.product,User.email);
    dispatch(setCartItems(newdata.cart));
    dispatch(notload());
  };

  return (
    <div className="flex h-full flex-col  bg-white ">
      <div className="flex-1 px-4 sm:px-6">
        <div className="w-full h-2 flex items-end">
          <BarLoader
            loading={loading}
            color="#a855f7"
            size={10}
            cssOverride={spinnerOverride}
          />
        </div>
        <div className="flex my-4 justify-between w-full items-center rounded-md">
          <h1 className="text-xl  font-semibold">Shopping Cart</h1>
          <div>
            <span onClick={() => ClearCart()}>
              <TrashIcon className="h-6 w-6 cursor-pointer  hover:scale-150" />
            </span>
          </div>
        </div>
        <div className="my-2">
          <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-300">
              {cartData && cartData.map((item) => (
                <li key={item.product.id} className="flex py-2">
                  <img
                    src={item.product.images[0].url}
                    alt={"Product Image"}
                    className="h-20 w-16 object-contain object-center border rounded-md"
                  />

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href={item.product.name}>{item.product.name}</a>
                        </h3>
                        <p className="ml-4">{item.product.price}</p>
                      </div>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-black ">
                      <span className="flex ">
                        <p className="text-gray-500">Qty {item.quantity}</p>
                        <span className="flex justify-around flex-col text-lg">
                          <ChevronUpIcon className="h-3 w-5 cursor-pointer hover:scale-125 text-black" onClick={()=>IncreaseItem(item)}/>
                          <ChevronDownIcon className="h-3 w-5 cursor-pointer hover:scale-125 text-black" onClick={()=>DecreaseItem(item)}/>
                        </span>
                      </span>

                      <div className="flex">
                        <button
                          onClick={() => DeleteItem(item)}
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p>$262.00</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">
          Shipping and taxes calculated at checkout.
        </p>
        <div className="mt-6">
          <a
            href="#"
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Checkout
          </a>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            or
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
              onClick={() => setOpen(false)}
            >
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
