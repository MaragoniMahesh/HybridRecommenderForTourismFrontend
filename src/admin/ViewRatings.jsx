import React, { useEffect, useState } from "react";
import { AxiosApi } from "../AxiosApi";
import moment from "moment";

const ViewRatings = () => {
  const [ratings, setRating]=useState()
  const getRating=async()=>{
    try {
      const rating = await AxiosApi.get(`admin/rating`);
      console.log(rating);
      setRating(rating.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getRating();
  },[])
  return (
    <div>
       <div className="flex flex-col">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table className="min-w-full">
          <thead className="border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                #
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
              Rating
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Message
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Place
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                User
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Date
              </th>
            </tr>
          </thead>
          <tbody>
          { ratings&&ratings.map((rating, index)=> <tr className="border-b">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {index+1}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex">
              {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={` p-1  ${
                        star <= rating.rating ? "text-yellow-400" : "text-gray-200"
                      } text-2xl `}
                      // onClick={() => handleStarClick(star)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="48px"
                        viewBox="0 -960 960 960"
                        width="48px"
                        fill="currentColor"
                      >
                        <path d="m384-334 96-74 96 74-36-122 90-64H518l-38-124-38 124H330l90 64-36 122ZM233-120l93-304L80-600h304l96-320 96 320h304L634-424l93 304-247-188-247 188Zm247-369Z" />
                      </svg>
                    </span>
                  ))}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {rating.message}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {rating.place}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {rating.username}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {moment(rating.created_at,'ddd, DD MMM YYYY HH:mm:ss [GMT]').local().format('Do MMM YYYY')}

              </td>
            </tr>)}
            {/* <tr className="bg-white border-b">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                2
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Jacob
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Thornton
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                @fat
              </td>
            </tr>
            <tr className="bg-white border-b">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                3
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Larry
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Wild
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                @twitter
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

     
    </div>
  );
};

export default ViewRatings;
