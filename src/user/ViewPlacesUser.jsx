import axios from "axios";
import React, { useEffect, useState } from "react";
import { AxiosApi } from "../AxiosApi";
import Loading from "../Loading";

const ViewPlacesUser = () => {
  const [placesData, setPlacesData] = useState();

  const [searchText, setSearchText] = useState();
  const searchPlaces = async (city) => {
    try {
      const result = await AxiosApi.get(`/recommendationss/${city}`);
      console.log(result);
      setPlacesData(result.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    
    const handler = setTimeout(() => {
      searchPlaces();
    }, 700); // Delay of 500ms

    // Cleanup function to cancel the timeout if `searchText` changes before 500ms
    return () => {
      clearTimeout(handler);
    };
  }, [searchText]);
  const [searchQuery, setSearchQuery] = useState("");
  const getPlacePhotos = async (searchQuery) => {
    const apiKey = "AIzaSyCUA3uUquQ88On7YaIFbBpByARvNj64GAU";
    try {
      // Get Place ID
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/findplacefromtext/json`,
        {
          params: {
            input: searchQuery,
            inputtype: "textquery",
            fields: "place_id",
            key: apiKey,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const placeId = response.data.candidates[0].place_id;

      // Get Place Details
      const response1 = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json`,
        {
          params: {
            place_id: placeId,
            fields: "photos",
            key: apiKey,
          },
        }
      );
      const photoReference = response1.data.result.photos[0].photo_reference;

      // Get Photo
      const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;

      console.log("Photo URL:", photoUrl);
    } catch (error) {
      console.error("Error fetching place photos:", error);
    }
  };
  useEffect(() => {
    // getPlacePhotos('Mount Everest', 'AIzaSyCUA3uUquQ88On7YaIFbBpByARvNj64GAU');
  }, []);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const getPlaces = async () => {
    try {
      const response = await AxiosApi.get(`/basicrecommendations/${user.id}`);
      console.log(response);
      setPlacesData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPlaces();
  }, []);
  return (
    <div>
      <div className="">
        <div className="mt-5 flex justify-end pr-10">
          <input
            type="search"
            name=""
            id=""
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="border border-blue-400 h-8 w-72 p-3 rounded-md"
            placeholder="Search Places"
          />{" "}
          <button
            className="text-white bg-green-500 h-8 w-16 rounded"
            onClick={() => searchPlaces(searchText)}
          >
            search
          </button>
        </div>
        <div className=" flex items-center justify-center ">
          <h1 className="text-2xl font-bold text-slate-800 mt-10 ml-10 uppercase">
            Places
          </h1>
        </div>
        <div className=" grid grid-cols-4 mt-5 p-4  gap-3   ">
          {placesData ?
            placesData.map((item) => (
              <div className=" border rounded-md p-3" key={item.id}>
                <img
                  src={`${item.photo}`}
                  alt="no photo"
                  className="w-full h-36 rounded-md"
                />
                <h1 className="text-xl font-bold text-slate-800 uppercase">
                  {
                    // truncate
                    item.Name.length > 20
                      ? item.Name.slice(0, 20) + "..."
                      : item.Name
                  }
                </h1>

                <p className="text-black ">
                  {item.Name}, <span className="font-semibold">{item.City}</span>,
                
                </p>
                <p>Avg Reviews:{item.rating} <span className="text-yellow-500 font-extrabold text-xl">☆ </span> </p>
                <p>Entrance Fees: ₹ {item.Fee}</p>
                <p>Place Type: {item.Type}</p>
              </div>
            )):<Loading/>}
          {/* <div className="basis-1/4 border rounded-md p-3">
            <img
              src="https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?cs=srgb&dl=pexels-asadphoto-1268855.jpg&fm=jpg"
              alt=""
              className="w-full h-36 rounded-md"
            />
            <h1 className="text-2xl font-bold text-slate-800">Travel</h1>
            <p className="text-black">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              voluptas.
            </p>
          </div>
          <div className="basis-1/4 border rounded-md p-3">
            <img
              src="https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?cs=srgb&dl=pexels-asadphoto-1268855.jpg&fm=jpg"
              alt=""
              className="w-full h-36 rounded-md"
            />
            <h1 className="text-2xl font-bold text-slate-800 ">Travel</h1>
            <p className="text-black">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              voluptas.
            </p>
          </div>
          <div className="basis-1/4 border rounded-md p-3">
            <img
              src="https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?cs=srgb&dl=pexels-asadphoto-1268855.jpg&fm=jpg"
              alt=""
              className="w-full h-36 rounded-md"
            />
            <h1 className="text-2xl font-bold text-slate-800 items-center justify-center">
              Travel
            </h1>
            <p className="text-black">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              voluptas.
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ViewPlacesUser;
