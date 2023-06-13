import React from "react";
import StarRating from './StarRating';

export default function Testimonial(props) {
    const {review}=props;
    console.log(review)
  return (
    <div className="w-5/6 rounded-md m-2 border">
      <div className="flex flex-col rounded-md bg-white ">
        <div className="flex flex-1 flex-col justify-between p-6">
          <div className="mb-4 flex space-x-2">
          <p className="truncate text-base font-semibold text-gray-800">{review.headline}</p>
            <StarRating value={review.rating}/>
          </div>
          <div className="flex-1 pt-2">
            <blockquote>
              <p className="text-lg text-gray-800">
                {review.content}
              </p>
            </blockquote>
          </div>

          <div className="mt-8 border-t border-gray-300 pt-4 dark:border-gray-800">
            <div className="flex items-center">
              {/* <img
                className="h-10 w-10 flex-shrink-0 rounded-full object-cover"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
                alt=""
              /> */}
              <div className="ml-3 min-w-0">
                <p className="truncate text-base font-semibold text-gray-800">{review.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
