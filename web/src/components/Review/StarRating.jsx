import { StarIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const StarRating = (props) => {
  
  const {value}=props
  let starArray = [false, false, false, false, false];
  for (let index = 0; index < value; index++) {
    starArray[index] = true;
  }

  return (
    <div className="flex ">
        {
            starArray.map((item , index)=>(
                <span key={index} >
                {item ? <StarIcon className="h-5 w-5 text-yellow-400" />
                :<StarIcon className="h-5 w-5 text-white stroke-yellow-500" />}
                </span>
            ))
        }
      
    </div>
  );
};
export default StarRating;
