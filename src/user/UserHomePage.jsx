import React from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { URL } from '../AxiosApi';

const UserHomePage = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));  // Assuming user is stored in local storage with key 'user'
    const location=useLocation();
  return (
    <div>
          <div style={{ position: "sticky", top: "0px" }} className='z-10'>
        <nav className="bg-slate-200 h-16">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className=" items-center flex">
              <img
                src="https://img.freepik.com/free-vector/flat-vintage-travel-background_23-2148189177.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1721260800&semt=ais_user"
    alt=""
                className=" rounded-full h-16 w-16 p-1"
              />
              <h1 className="text-blue-600 font-bold text-2xl ml-4">TravelMate</h1>
            </div>

            {/* Left side */}
            <div className="flex items-center">
              <Link to="/user" className="text-blue-600 font-bold text-xl mr-4">
                Home
              </Link>
              <NavLink to="timeline" className="text-blue-600 hover:text-blue-300 mr-4">
                Timeline
              </NavLink>
              <NavLink to="people" className="text-blue-600 hover:text-blue-300 mr-4">
                People
              </NavLink>
              <NavLink to="tweets" className="text-blue-600 hover:text-blue-300 mr-4">
                Tweet
              </NavLink>
              <NavLink to="ratings" className="text-blue-600 hover:text-blue-300 mr-4">
                Give Rating
              </NavLink>
              <NavLink to="recommendation" className="text-blue-600 hover:text-blue-300 mr-4">
                Recommendation
              </NavLink>
              <NavLink to="chat" className="text-blue-600 hover:text-blue-300 mr-4">
                Chat
              </NavLink>
              <NavLink to="followers" className="text-blue-600 hover:text-blue-300 mr-4">
                Followers
              </NavLink>
              <NavLink to="followings" className="text-blue-600 hover:text-blue-300 mr-4">
              Following
              </NavLink>
              
            </div>
<div className="flex items-center">
              <NavLink to="profile"
               
                className="text-blue-600 hover:text-blue-300 mr-4 cursor-pointer"
               
              >
               <img
    src={`${URL}/static/uploads/${user?.profile_pic}`}
    // src="https://img.freepik.com/free-vector/flat-vintage-travel-background_23-2148189177.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1721260800&semt=ais_user"
                alt=""
                className=" rounded-full h-16 w-16 p-1"
              />
              </NavLink>
              </div>
            {/* Right side 
             
              <p
                className="bg-white cursor-pointer text-blue-500 hover:text-blue-300 hover:bg-gray-100 text-sm rounded-full px-4 py-2"
                onClick={handleClick}
              >
                Register
              </p>
            </div>*/}
           
          </div>
        </nav>
      </div>
      <div className='min-h-screen'>
        {
            location.pathname==="/user"&& <div className="w-full h-screen object-cover"  style={{
                background: `url(${"https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?cs=srgb&dl=pexels-asadphoto-1268855.jpg&fm=jpg"})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",}}>Welcome</div>
        }
           
        <Outlet/>
      </div>
      <footer className="h-[50px]  w-full bg-gray-800 text-white flex items-center justify-center ">
          <p>&copy; 2024 TravelMate. All rights reserved.</p>
        </footer>
    </div>
  )
}

export default UserHomePage