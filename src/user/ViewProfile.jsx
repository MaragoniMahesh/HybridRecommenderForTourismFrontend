import React from 'react'
import { URL } from '../AxiosApi'

const ViewProfile = () => {
  const user=JSON.parse(sessionStorage.getItem('user'))
  return (
    <div className='flex justify-center p-5'>
        
       <a
  className="p-8 max-w-lg border border-indigo-300 rounded-2xl hover:shadow-xl hover:shadow-indigo-50 flex flex-col items-center"
  href="#"
>
  <img
    // src="https://loremflickr.com/800/600/girl"
    // src={`${user?.profile_pic}`}
    src={`${URL}/static/uploads/${user.profile_pic}`}

    className="shadow rounded-lg overflow-hidden border"
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
      onClick={
        () => {
          sessionStorage.removeItem('user')
          window.location.href = '/'
        }
      }
        type="button"
        className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-gray-900"
      >
      Logout
      </button>
    </div>
  </div>
</a>
    </div>
  )
}

export default ViewProfile