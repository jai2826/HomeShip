import { InformationCircleIcon, StarIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import RatingCard from "./Review/RatingCard";
import { Link } from "react-router-dom";
import { setItem } from "./../../utils/CartUpdate";
import { useDispatch, useSelector } from "react-redux";
import { setCartItems } from "../../feature/Cart/cart";
import { load as cartload, notload as cartNotload } from "../../feature/Cart/loading";

export default function ({ data }) {
  const [ratingVisible, setRatingVisible] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    const getRating = () => {
      const sum = data.reviews.reduce((acc, item) => acc + item.rating, 0);
      const avg = sum / data.reviews.length;
      return avg;
    };
    const average = getRating();
    setAverageRating(average);
  }, []);

  const cartData = useSelector((state) => state.cart.data);
  const cartId = useSelector((state) => state.cart.cartId);
  const userId = useSelector((state) => state.auth.data.id);
  const setCartData = async () => {
    dispatch(cartload());
    const newdata = await setItem(cartData,cartId,data);
    dispatch(setCartItems(newdata.cart));
    dispatch(cartNotload());
  };

  return (
    <div className="flex flex-col h-96 w-80 md:h-[360px] md:w-[260px] border my-5 rounded-md ">
      <Link to={"/"} className="h-44 flex justify-center p-1 ">
        <img
          className="h-full  object-center "
          src={data.images[0].url}
          alt="Card Image"
        />
      </Link>
      <div className="flex flex-col py-1 px-3 h-fit">
        <Link to={"/"} className="p-0.5 ">
          {" "}
          <h1 className="text-xl h-7"> {data.name} </h1>
        </Link>
        <Link to={"/"} className="p-1 h-[60px]">
          {data.description.slice(0, 50)}...
        </Link>
        <div className="p-1 flex justify-between">
          <p> ₹{data.price}</p>
          {data.coupon && (
            <div className="flex space-x-1 items-center">
              {data.coupon.type === "percent" ? (
                <p> {data.coupon.value}% off</p>
              ) : (
                <p> ₹{data.coupon.value} off</p>
              )}
              <InformationCircleIcon className="h-5 w-5 text-blue-500 inline-block" />{" "}
            </div>
          )}
        </div>
        <div className="p-1 flex flex-grow items-center  justify-between ">
          {" "}
          <button
            onClick={() => setCartData()}
            className="p-2 border rounded-md hover:bg-purple-500"
          >
            Add to Cart
          </button>{" "}
          {data.reviews.length > 0 && (
            <div
              onMouseEnter={() => setRatingVisible(true)}
              onMouseLeave={() => setRatingVisible(false)}
              className="flex items-center justify-between w-10"
            >
              <span
                onClick={() => alert("Hello Harrry")}
                className="cursor-pointer hover:underline"
              >
                {Number(averageRating.toFixed(1))}
              </span>
              <StarIcon className="h-6 w-6 text-yellow-400" />{" "}
            </div>
          )}
        </div>
        {ratingVisible && (
          <div
            onMouseEnter={() => setRatingVisible(true)}
            onMouseLeave={() => setRatingVisible(false)}
            className={
              "relative h-48 w-full border -top-3 left-1/4 rounded-md bg-white"
            }
          >
            <RatingCard
              ratings={data.reviews}
              average={Number(averageRating.toFixed(1))}
            />
          </div>
        )}
      </div>
    </div>
  );
}
