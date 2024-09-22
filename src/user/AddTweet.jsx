import React, { useState } from 'react'
import { AxiosApi } from '../AxiosApi';
import Loading from '../Loading';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddTweet = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const [tweet, setTweet] = useState();
  const [loading, setLoading] = useState(false)

  const navigateTo= useNavigate();

const [showLocations, setShowLocations] =useState(false);
const handleSubmit=async(e)=>{
  setLoading(true);
  e.preventDefault();
  const formData= new FormData(e.target)

try {
  const res= await AxiosApi.post(`tweet/${user.id}`, formData);
  console.log(res);
  toast.success(res.data.msg);
  navigateTo('/user/timeline');

} catch (error) {
  console.log(error);
  toast.error(error.response.data.msg);
}
finally{
  setLoading(false)
}

}
  return (
    <div>
        <div className="max-w-xl mx-auto mt-16 flex w-full flex-col border border-blue-500 rounded-lg bg-white p-8">
  <h2 className="title-font mb-1 text-lg font-medium text-gray-900">
    Post new Tweet
  </h2>
  <form onSubmit={handleSubmit}>
  <div className="mb-4">
    <label htmlFor="title" className="text-sm leading-7 text-gray-600">
      Title
    </label>
    <input
      type="text"
      id="title"
      name="title"
      className="w-full rounded border border-gray-300 bg-white py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
    />
  </div>
  <div className="mb-4">
    <label htmlFor="location" className="text-sm leading-7 text-gray-600">
      <input type="checkbox" id="location" onChange={()=>setShowLocations(!showLocations)} /> Want to add a location
    </label>
    
  </div>
  {showLocations&&<div className="mb-4">
    <label htmlFor="place" className="text-sm leading-7 text-gray-600">
      Location
    </label>
    <input
      type="text"
      id="place"
      name="place"
      placeholder='e.g Delhi'
      className="w-full rounded border border-gray-300 bg-white py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
    />
  </div>}
  <div className="mb-4">
    <label htmlFor="tweet" className="text-sm leading-7 text-gray-600">
    Tweet
    </label>
    <textarea
      id="tweet"
      name="tweet"
      className="h-32 w-full resize-none rounded border border-gray-300 bg-white py-1 px-3 text-base leading-6 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
      />
    <div className="mb-4">
    <label htmlFor="photo" className="text-sm leading-7 text-gray-600">
      Photo
    </label>
    <input
      type="file"
      id="photo"
      name="photo"
      className="w-full rounded border border-gray-300 bg-white py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
    />
  </div>
  </div>
 { loading?<Loading/>:<button type='submit' className="rounded border-0 bg-indigo-500 py-2 px-6 text-lg text-white hover:bg-indigo-600 focus:outline-none">
    Post
  </button>}
  <p className="mt-3 text-xs text-gray-500">
    This tweet is visible to all users.
  </p></form>
</div>

    </div>
  )
}

export default AddTweet