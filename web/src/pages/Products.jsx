import { useEffect, useState } from "react";
import Card from "../components/Card";
import testData from "./../assets/myTestData.json";
import { GraphQLClient, gql } from "graphql-request";
import { useDispatch, useSelector } from 'react-redux'
import {setProducts} from './../../feature/Product/products'
import { setProgress } from "../../feature/Page/loading";

export default function Products() {
  const [itemCount, setItemCount] = useState(35);
  const [newdata, setNewData] = useState(testData.slice(0, itemCount));
  const showMore = async () => {
    setNewData(newdata.concat(testData.slice(itemCount, itemCount + 14)));
    setItemCount((prevState) => prevState + 14);
    console.log(newdata, itemCount);
  };

  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(setProgress(20));
    const FetchData = async ()=>{
      // Working wiht Graphql
      // Graph Ql client setup
      const graphQLClient = new GraphQLClient(
        import.meta.env.VITE_HYGRAPH_ENDPOINT,
        {
          headers: {
            authorization: `Bearer ${import.meta.env.VITE_HYGRAPH_TOKEN}`,
          }
        }
      );
  
      // Query Setup
      const query = gql`
      query Product {
        products {
          id
          name
          price
          images {
            id
            url
            fileName
          }
          reviews {
            content
            email
            headline
            id
            name
            rating
          }
          description
          coupon {
            value
            name
            type
          }
        }
      }
      `;
      dispatch(setProgress(40));
      // Calling the query
      const Newdata = await graphQLClient.request(query);
      dispatch(setProgress(60));
      const Random = await JSON.parse(JSON.stringify(Newdata.products))
      dispatch(setProgress(80));
      dispatch(setProducts(Random))
      dispatch(setProgress(100));
    }
    FetchData();
  }, [])
  const productsData = useSelector(state=>state.products.data)
  

  return (
    <div className="flex flex-col bg-white p-2 h-full">
      <div className="flex flex-wrap justify-evenly ">
        {productsData.map((item) => {
          return (
            <div key={item.id}>
              <Card data={item} />
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-center h-80 w-full">
        <button
          onClick={showMore}
          className="flex text-2xl font-bold hover:bg-purple-500 p-4 rounded-md"
        >
          More Item
        </button>
      </div>
    </div>
  );
}
