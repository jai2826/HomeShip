import StarRating from "./Review/StarRating";
import { useDispatch, useSelector } from "react-redux";
import { load, notload } from "../../feature/Product/loading";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  setFilters,
  clearFilters,
  clearRatingFilters,
} from "../../feature/Product/filter";
import { GraphQLClient, gql } from "graphql-request";
import {
  FunnelIcon,
  MagnifyingGlassIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { setDisplayProducts } from "../../feature/Product/products";

const Filter = () => {


  const [filterCount, setFilterCount] = useState(0)
  const graphQLClient = new GraphQLClient(
    import.meta.env.VITE_HYGRAPH_ENDPOINT,
    {
      headers: {
        authorization: `Bearer ${import.meta.env.VITE_HYGRAPH_TOKEN}`,
      },
    }
  );

  const dispatch = useDispatch();
  const RatingArr = [
    {
      value: 4,
      id: "four",
    },
    {
      value: 3,
      id: "three",
    },
    {
      value: 2,
      id: "two",
    },
    {
      value: 1,
      id: "one",
    },
  ];

  const CategoryArr = [
    {
      id: "mens",
      value: "Mens",
    },
    {
      id: "womens",
      value: "Womens",
    },
    {
      id: "tshirts",
      value: "Tshirts",
    },
    {
      id: "shirts",
      value: "Shirts",
    },
    {
      id: "hoodies",
      value: "Hoodies",
    },
    {
      id: "caps",
      value: "Caps",
    },
  ];
  const filters = useSelector((state) => state.filters.data);
  const [tempFilters, setTempFilters] = useState(filters);

  // const filter
  const handleCategoryChange = async (e) => {
    
    const { checked, value } = e.target;
    if (checked) {
      setTempFilters((prev) => {
        return {
          ...prev,
          categories: [...prev.categories, value],
        };
      });
    } else {
      setTempFilters((prev) => {
        return {
          ...prev,
          categories: prev.categories.filter((item) => {
            return item != value;
          }),
        };
      });
    }
  };

  const handleRatingChange = async (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setTempFilters((prev) => {
        return {
          ...prev,
          rating: parseInt(value),
        };
      });
    }
    
  };

  const handlePriceChange = async (e) => {
    const { value, name } = e.target;

    setTempFilters((prev) => {
      return {
        ...prev,
        price: {
          ...prev.price,
          [name]: value,
        },
      };
    });
  };

  // console.log(tempFilters)
  const applyFilter = async () => {
    dispatch(setFilters(tempFilters));    
  };
  const clearFilter = async () => {
    dispatch(clearFilters());
  };
  const clearRatingFilter = async () => {
    dispatch(clearRatingFilters());
  };

  
  useEffect(() => {
    setTempFilters(filters);
  }, [filters]);
  useEffect(() => {
    applyFilter();
  }, [tempFilters.rating]);




  



  return (
    <div className="w-100 py-2 h-fit bg-white sticky top-20">
      <div className="m-2 p-2  rounded-md flex justify-between bg-cyan-500">
        <h1 className="text-2xl font-semibold">Filters</h1>
        <span>
          <button
            type="button"
            onClick={applyFilter}
            className="px-2 py-1 hover:bg-white rounded-md"
          >
            <FunnelIcon className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={clearFilter}
            className="px-2 py-1 hover:bg-white rounded-md"
          >
            <TrashIcon className="h-6 w-6" />
          </button>
        </span>
      </div>
      <form className="flex flex-col h-full w-full p-2">
        <div className="m-2 ">
          <h1 className="text-md font-semibold">Category</h1>
          <ul className="px-2">
            {CategoryArr.map((item, index) => {
              return (
                <li key={index} className="flex space-x-2">
                  <input
                    type="checkbox"
                    id={item.id}
                    name={item.id}
                    value={item.value}
                    checked={tempFilters.categories.includes(item.value)}
                    onChange={handleCategoryChange}
                  />
                  <label htmlFor={item.id}>{item.value}</label>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="my-4 w-full h-0.5 bg-black/40"></div>
        <div className="m-2 ">
          <h1 className="text-md font-semibold">Price</h1>
          <ul className="px-2">
            <div className="flex w-full py-2 items-center space-x-2">
              <div className="flex space-x-1 w-4/6  items-center">
                <li className="flex items-center px-2 w-1/2 border font-medium border-black/60 shadow-sm  rounded-md ">
                  ₹
                  <input
                    className=" focus:outline-none  w-full ml-[1px] text-sm font-normal"
                    type="number"
                    id="start"
                    name="start"
                    onChange={handlePriceChange}
                    placeholder="Min"
                    value={
                      tempFilters.price.start != 0 && tempFilters.price.start
                    }
                  />
                </li>
                <li className="flex items-center px-2 w-1/2 border font-medium border-black/60 shadow-sm  rounded-md ">
                  ₹
                  <input
                    className=" focus:outline-none  w-full ml-[1px] text-sm font-normal"
                    type="number"
                    id="end"
                    name="end"
                    onChange={handlePriceChange}
                    placeholder="Max"
                    value={
                      tempFilters.price.end != 50000 && tempFilters.price.end
                    }
                  />
                </li>
              </div>
              <button
                onClick={applyFilter}
                type="button"
                className="border-black/60 border rounded-md hover:bg-cyan-500 px-1 py-0.5 flex"
              >
                <MagnifyingGlassIcon className="w-5 h-5 " />
              </button>
            </div>
          </ul>
        </div>
        <div className="my-4 w-full h-0.5 bg-black/40"></div>
        <div className="m-2 ">
          <span className="flex justify-between items-center ">
            <h1 className="text-md font-semibold">Customer Rating</h1>
            <button
              type="button"
              onClick={clearRatingFilter}
              className="px-2 py-1 hover:bg-white rounded-md"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </span>
          <ul className="px-2">
            {RatingArr.map((item) => {
              return (
                <li key={item.value} className="flex space-x-2">
                  <input
                    type="radio"
                    id={item.id}
                    name="rating"
                    value={item.value}
                    checked={item.value == tempFilters.rating}
                    onChange={handleRatingChange}
                  />
                  <label
                    htmlFor={item.id}
                    className="flex items-center space-x-1"
                  >
                    <StarRating value={item.value} />
                    <p>& Up</p>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
        {/* <div className="w-full h-0.5 bg-black/40"></div> */}
        {/* <div className="my-2 ">
          <h1 className="text-md font-semibold">Deals</h1>
        </div> */}
      </form>
    </div>
  );
};
export default Filter;
