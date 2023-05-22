import { useLayoutEffect } from "react";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { setDisplayProducts } from "./../../feature/Product/products";
import Filter from "../components/Filter";
import PropogateLoader from "react-spinners/PropagateLoader";
import RightUtils from "../components/RightUtils/Base";

export default function Products() {
  // const [itemCount, setItemCount] = useState(35);
  // const [newdata, setNewData] = useState(testData.slice(0, itemCount));
  // const showMore = async () => {
  //   setNewData(newdata.concat(testData.slice(itemCount, itemCount + 14)));
  //   setItemCount((prevState) => prevState + 14);
  //   //console.log(newdata, itemCount);
  // };

  const dispatch = useDispatch();
  const productLoading = useSelector((state) => state.productsLoading.value);
  const filters = useSelector((state) => state.filters.data);
  const productsData = useSelector((state) => state.products.fetchedData);
  const displayData = useSelector((state) => state.products.displayData);

  const Filteration = async () => {
    const priceFilterArr = await productsData.filter((item) => {
      if (item.price >= filters.price.start && item.price <= filters.price.end)
        return item;
    });
    const categoryFilterArr = await priceFilterArr.filter((item) => {
      const newArr = item.categories.map((elem) => elem.name);
      const data = filters.categories.every((elem) => newArr.includes(elem));
      return data;
    });
    const newProduct = await categoryFilterArr.filter((item) => {
      const getRating = () => {
        const sum = item.reviews.reduce((acc, data) => acc + data.rating, 0);
        const avg = sum / item.reviews.length;
        return avg;
      };
      const data = getRating();
      // Check For data is NaN or not
      const average = isNaN(data) ? 0 : data;
      if (average >= filters.rating) return item;
    });
    dispatch(setDisplayProducts(newProduct));
  };

  useLayoutEffect(() => {
    Filteration();
  }, [filters]);

  return (
    <div className="flex w-full h-full space-x-1 ">
      <Filter />
      <div
        className={`${
          productLoading ? "pointer-events-none " : ""
        } flex flex-col p-2 w-full h-full bg-white `}
      >
        <div className="flex items-center justify-center my-2 ">
          <PropogateLoader loading={productLoading} color="#06b6d4" />
        </div>
        <div className="flex w-full flex-col ">
          <div className="flex flex-wrap lg:px-8 ">
            {displayData.map((item) => {
              return <Card key={item.id} data={item} />;
            })}
          </div>
          {/* <div className="flex items-center justify-center h-80 w-full">
            <button
              onClick={showMore}
              className="flex text-2xl font-bold hover:bg-purple-500 p-4 rounded-md"
            >
              More Item
            </button>
          </div> */}
        </div>
      </div>
      
    </div>
  );
}
