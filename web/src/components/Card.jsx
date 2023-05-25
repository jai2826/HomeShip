import {
  HeartIcon,
  InformationCircleIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
// import { HeartIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import RatingCard from "./Review/RatingCard";
import { Link } from "react-router-dom";
import { setItem } from "./../../utils/CartUpdate";
import { useDispatch, useSelector } from "react-redux";
import { setCartItems } from "../../feature/Cart/cart";
import {
  load as cartload,
  notload as cartNotload,
} from "../../feature/Cart/loading";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { GraphQLClient, gql } from "graphql-request";
import { setFavourite } from "../../feature/Auth/favourite";
import {TbShare2} from 'react-icons/tb'

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
  const favourites = useSelector((state) => state.favourite);
  const cartData = useSelector((state) => state.cart.data);
  const cartId = useSelector((state) => state.cart.cartId);
  const User = useSelector((state) => state.auth.data);

  const setCartData = async () => {
    dispatch(cartload());
    const newdata = await setItem(cartData, cartId, data);
    dispatch(setCartItems(newdata.cart));
    dispatch(cartNotload());
  };

  let checkFavourite = favourites.products.includes(data.id);
  let favLength = favourites.products.length > 0;
  let favouriteId = favourites.id;
  const [startTransition, setStartTransition] = useState(false);
  const handleFavourite = async () => {
    setStartTransition(true);
    setTimeout(() => {
      setStartTransition(false);
    }, 500);
    if (!checkFavourite) {
      const graphQLClient = new GraphQLClient(
        import.meta.env.VITE_HYGRAPH_ENDPOINT,
        {
          headers: {
            authorization: `Bearer ${import.meta.env.VITE_HYGRAPH_TOKEN}`,
          },
        }
      );
      
      // Mutation Setup
      const query = gql`
      mutation MyMutation {
        updateCustomer(
          where: {email: "${User.email}"}
          ${
            favLength
              ? `data: {favourite: {update: {data: {product: {connect: {Product: {where: {id: "${data.id}"}}}}}, where: {id: "${favouriteId}"}}}}`
              : `data: {favourite: {create: {product: {connect: {Product: {id: "${data.id}"}}}}}}`
          }
        ) {
          favourite {
            id
            product {
              ... on Product {
                id
                name
              }
            }
          }
        }
        publishCustomer(where: {email: "${User.email}"}, to: PUBLISHED) {
          id
        }
      }
      `;
      const Newdata = await graphQLClient.request(query);
      
      

      if (Newdata.updateCustomer.favourite) {
        const tempArr = Newdata.updateCustomer.favourite.product.map((item) => {
          return item.id;
        });
        dispatch(
          setFavourite({
            data: tempArr,
            id: Newdata.updateCustomer.favourite.id,
          })
        );
      }
    }
    
  };



  const handleShare = ()=>{
    console.log(data)
  }

  return (
    <div className="relative flex flex-col h-96 w-full md:h-[360px] md:w-1/3.5 border my-5 rounded-md lg:mx-4 ">
      <Link to={"/"} className="h-44 flex justify-center p-1 ">
        <img
          className="h-full  object-center "
          src={data.images[0].url}
          alt="Card Image"
        />
      </Link>
      <span className="absolute top-0 right-0 " >
        {/* {checkFavourite ? (
          <FaHeart
          onClick={handleFavourite}
            className={`w-8 h-8 p-1 rounded-md  text-rose-500 ${
              startTransition ? "scale-140" : "scale-100"
            } ${
              startTransition && "pointer-events-none"
            } transform transition  ease-out cursor-pointer`}
          />
        ) : (
          <FaRegHeart
          onClick={handleFavourite}
            className={`w-8 h-8 p-1 rounded-md  text-black/70 ${
              startTransition ? "scale-140" : "scale-100"
            } ${
              startTransition && "pointer-events-none"
            } transform transition  ease-out cursor-pointer`}
          />
        )} */}



        <TbShare2 className="w-8 h-8 p-0.5 pb-1 rounded-full cursor-pointer" onClick={handleShare}/>
      </span>
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
              "relative z-40 h-48 w-[80%] border -top-3 left-1/4 rounded-md bg-white"
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
