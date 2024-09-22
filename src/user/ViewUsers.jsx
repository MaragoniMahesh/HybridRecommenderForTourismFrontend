import React, { useEffect, useState } from 'react'
import { AxiosApi, URL } from '../AxiosApi'
import { toast } from 'react-toastify';

const ViewUsers = () => {
  const user= JSON.parse(sessionStorage.getItem('user'));
  // get All users 
  const [users, setUsers] =useState()
  const getUsers = async() =>{
    // Call API to get users
   try {
    const response = await AxiosApi.get(`/users/${user.id}`)
    console.log(response.data)
    setUsers(response.data.data)
   } catch (error) {
    console.log(error);
   }
  }
  
  // call getUsers function
  useEffect(()=>{
    getUsers()
   }, []
  );
  const followingsFunction = async(id)=>{
    try {
      const response = await AxiosApi.post(`following/${user.id}/${id}`);
      console.log(response.data);
      toast.warn(response.data.msg, {
        position: "bottom-right"
      });
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
        <div className='grid grid-cols-4 gap-3 mt-5'>
       {users&&users.map((user)=> 
       <a key={user._id}
  className="p-8 max-w-lg border border-indigo-300 rounded-2xl hover:shadow-xl hover:shadow-indigo-50 flex flex-col items-center"
  href="#"
>
  {/* src="/images/img.jpg" */}
  <img
    // src="https://loremflickr.com/800/600/girl"
    src={`${URL}/static/uploads/${user.profile_pic}`}
    className="shadow rounded-lg overflow-hidden border "
  />
  <div className="mt-8">
  <h4 className="font-bold text-xl">{user?.username}</h4>
    <p className="mt-2 text-gray-600">
      email: {user?.email},
      <br />
      Mobile: {user?.Mobile}
      <br />
      Address: {user?.address}
      <br />
      City: {user?.city}
    </p>
    <div className="mt-5">
      <button
        type="button"
        onClick={()=>followingsFunction(user.id)}
        className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-gray-900"
      >
        Start Following
      </button>
    </div>
  </div>
</a>)}


        </div>
    </div>
  )
}

export default ViewUsers