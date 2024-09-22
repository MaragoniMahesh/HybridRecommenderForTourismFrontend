import React, { useEffect, useState } from 'react'
import { AxiosApi, URL } from '../AxiosApi'
import { toast } from 'react-toastify';
import moment from 'moment';

const ViewUsersAdmin = () => {
  const [followers, setFollowers] = useState([])
  const getFollowers =async () =>{
    // API call to fetch followers data
    // Return the fetched followers data
    try {
      
      const response= await AxiosApi.get(`admin/users`)
      console.log(response.data);
      setFollowers(response.data.data)
    } catch (error) {
      console.error(error);
    }
  }
  // call fuction with useeffect
  React.useEffect(()=>{
    getFollowers()
  },[])
  return (
    <div>
        <div className="p-10 ">
            <div className="p-5 border border-blue-500  rounded h-screen overflow-y-scroll">
        <ul role="list" className="divide-y divide-blue-100">
  {followers&&followers.map((user)=><li className="flex justify-between gap-x-6 py-5">
    <div className="flex min-w-0 gap-x-4">
      <img
    src={`${URL}/static/uploads/${user.profile_pic}`}
    className="h-12 w-12 flex-none rounded-full bg-gray-50"
        // src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt=""
      />
      <div className="min-w-0 flex-auto">
        <p className="text-sm font-semibold leading-6 text-gray-900">
          {user.username}
        </p>
        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
          {user.email}
        </p>
      </div>
    </div>
    <div>
      Reg Date: {moment(user.created_at).format('Do MMM YYYY')}
    </div>
    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
    {user.address} <br />
    {user.city} <br />
    {user.Mobile}
    </div>
  </li>)}
  
</ul></div>
</div>
    </div>
  )
}


export default ViewUsersAdmin