import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AxiosApi, URL } from '../AxiosApi';

const ViewPlaces = () => {
  const [places, setPlaces] = useState([]);
  const getPlaces = async() =>{
    try {
     const result = await AxiosApi.get(`/admin/places`);
     console.log(result);

      setPlaces(result.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  useEffect(()=>{
    getPlaces();
  }, [])
  const [searchQuery, setSearchQuery] = useState('');
  const getPlacePhotos = async (searchQuery) => {
    const apiKey="AIzaSyCUA3uUquQ88On7YaIFbBpByARvNj64GAU"
    try {
      // Get Place ID
      const response = await axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json`, {
        params: {
          input: searchQuery,
          inputtype: 'textquery',
          fields: 'place_id',
          key: apiKey
        }
      });
      const placeId = response.data.candidates[0].place_id;
  
      // Get Place Details
    const  response1 = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json`, {
        params: {
          place_id: placeId,
          fields: 'photos',
          key: apiKey
        }
      });
      const photoReference = response1.data.result.photos[0].photo_reference;
  
      // Get Photo
      const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;
  
      console.log('Photo URL:', photoUrl);
    } catch (error) {
      console.error('Error fetching place photos:', error);
    }
  };
  useEffect(()=>{
    // getPlacePhotos('Mount Everest', 'AIzaSyCUA3uUquQ88On7YaIFbBpByARvNj64GAU');
  },[])
  return (
    <div>
         <div className=" h-[400px] w-screen ">
        <div className=" flex items-center justify-center ">
          <h1 className="text-2xl font-bold text-slate-800 mt-10 ml-10 uppercase">
           Places 
          </h1>
        </div>
        <div className=" flex flex-row mt-5 p-4 gap-3  ">
         {places&&places.map((item)=> <div className="basis-1/4 border rounded-md p-3">
            <img
    src={`${URL}/static/uploads/${item.image}`}
    // src="https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?cs=srgb&dl=pexels-asadphoto-1268855.jpg&fm=jpg"
              alt=""
              className="w-full h-36 rounded-md"
            />
            <h1 className="text-2xl font-bold text-slate-800">{item.name}</h1>
            
            <p className="text-black text-base">
              {item.description}
            </p>
            <p className="text-gray-700 text-sm">
              Location: {item.location}, <br />
              Category: {item.category}
            </p>
          </div>)}
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
  )
}

export default ViewPlaces