import React, { useEffect, useState } from 'react'
import { AxiosApi, URL } from '../AxiosApi';

const ViewFollowing = () => {
  const user= JSON.parse(sessionStorage.getItem('user'));
  const [followings, setFollowings]=useState([]);
  const getfollowings=async()=>{
    try {
      const results=await AxiosApi.get(`followings/${user.id}`);
      setFollowings(results.data.data);
      console.log(results);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getfollowings();
  },[])
  return (
    <div>
        <div className="p-10 ">
            <div className="p-5 border border-blue-500  rounded h-screen overflow-y-scroll">
        <ul role="list" className="divide-y divide-blue-100">
  {followings&&followings.map((user)=><li className="flex justify-between gap-x-6 py-5">
    <div className="flex min-w-0 gap-x-4">
      <img
        className="h-12 w-12 flex-none rounded-full bg-gray-50"
    src={`${URL}/static/uploads/${user.profile_pic}`}

        // src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt=""
      />
      {/*  <h4 className="font-bold text-xl">{user?.username}</h4>
    <p className="mt-2 text-gray-600">
      email: {user?.email},
      <br />
      Mobile: {user?.Mobile}
      <br />
      Address: {user?.address}
      <br />
      City: {user?.city}
    </p> */}
      <div className="min-w-0 flex-auto">
        <p className="text-sm font-semibold leading-6 text-gray-900">
        {user?.username}
        </p>
        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
        {user?.email}
        </p>
      </div>
    </div>
    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
      <button className="bg-blue-600 text-white h-8 w-24 rounded-full opacity-60" disabled>Following</button>
    </div>
  </li>)}
 
</ul></div>
</div>
    </div>
  )
}

export default ViewFollowing