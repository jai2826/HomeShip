import { Line as RatingBar } from "rc-progress";
import { useEffect, useState } from "react";

export default function RatingCars({ ratings , average }) {
  const ratingLength = ratings.length;
  const [ratingData, setRatingData] = useState({
    one: {
      count: ratings.filter((item) => item.rating === 1).length,
    },
    two: {
      count: ratings.filter((item) => item.rating === 2).length,
    },
    three: {
      count: ratings.filter((item) => item.rating === 3).length,
    },
    four: {
      count: ratings.filter((item) => item.rating === 4).length,
    },
    five: {
      count: ratings.filter((item) => item.rating === 5).length,
    },
  });

  function getPercent(length, totalLength){
    return (length / totalLength) * 100;
  };

  useEffect(() => {
    setRatingData((prev) => ({
      one: {
        ...prev.one,
        percent: getPercent(prev.one.count, ratingLength),
      },
      two: {
        ...prev.two,
        percent: getPercent(prev.two.count, ratingLength),
      },
      three: {
        ...prev.three,
        percent: getPercent(prev.three.count, ratingLength),
      },
      four: {
        ...prev.four,
        percent: getPercent(prev.four.count, ratingLength),
      },
      five: {
        ...prev.five,
        percent: getPercent(prev.five.count, ratingLength),
      },
    }));
  }, []);

  return (
    <div className="p-3">
      <div>
        <RatingBar
          className="h-2 w-full rounded-md "
          strokeLinecap="round"
          strokeColor={"#facc15"}
          percent={getPercent(average, 5)}
        />
      </div>
      <div className="flex w-full items-center justify-between mt-1 mb-3 font-semibold">
        <h1>{average} out of 5</h1>
        <span className="h-5 border-black/75 border rounded-xl"></span>
        <p> {ratingLength} Ratings </p>
      </div>
      <div>
        <ul>
          <li className="w-full flex items-center justify-between ">
            1 Star{" "}
            <RatingBar
              className="h-1 w-1/2 rounded-md "
              strokeColor={"#facc15"}
              percent={ratingData.one.percent}
            />{" "}
            {ratingData.one.count}{" "}
          </li>
          <li className="w-full flex items-center justify-between ">
            2 Star{" "}
            <RatingBar
              className="h-1 w-1/2 rounded-md "
              strokeColor={"#facc15"}
              percent={ratingData.two.percent}
            />{" "}
            {ratingData.two.count}{" "}
          </li>
          <li className="w-full flex items-center justify-between ">
            3 Star{" "}
            <RatingBar
              className="h-1 w-1/2 rounded-md "
              strokeColor={"#facc15"}
              percent={ratingData.three.percent}
            />{" "}
            {ratingData.three.count}{" "}
          </li>
          <li className="w-full flex items-center justify-between ">
            4 Star{" "}
            <RatingBar
              className="h-1 w-1/2 rounded-md "
              strokeColor={"#facc15"}
              percent={ratingData.four.percent}
            />{" "}
            {ratingData.four.count}{" "}
          </li>
          <li className="w-full flex items-center justify-between ">
            5 Star{" "}
            <RatingBar
              className="h-1 w-1/2 rounded-md "
              strokeColor={"#facc15"}
              percent={ratingData.five.percent}
            />{" "}
            {ratingData.five.count}{" "}
          </li>
        </ul>
      </div>
    </div>
  );
}
