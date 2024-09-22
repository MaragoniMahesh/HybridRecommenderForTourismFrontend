import React from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'

const AdminHomePage = () => {
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
              <Link to="/admin" className="text-blue-600 font-bold text-xl mr-4">
                Home
              </Link>
              <NavLink to="add-place" className="text-blue-600 hover:text-blue-300 mr-4">
                Add Place
              </NavLink>
              <NavLink to="users" className="text-blue-600 hover:text-blue-300 mr-4">
                Users
              </NavLink>
              <NavLink to="tweets" className="text-blue-600 hover:text-blue-300 mr-4">
                Tweets
              </NavLink>
              <NavLink to="ratings" className="text-blue-600 hover:text-blue-300 mr-4">
                View Ratings
              </NavLink>
              <NavLink to="places" className="text-blue-600 hover:text-blue-300 mr-4">
                View Places
              </NavLink>
              <NavLink to="graphs" className="text-blue-600 hover:text-blue-300 mr-4">
                Graphs
              </NavLink>
              {/* <NavLink to="followers" className="text-blue-600 hover:text-blue-300 mr-4">
                Followers
              </NavLink>
              <NavLink to="followings" className="text-blue-600 hover:text-blue-300 mr-4">
              Following
              </NavLink> */}
              
            </div>
<div className="flex items-center">
              <NavLink to="/"
               
                className="text-blue-600 hover:text-blue-300 mr-4 cursor-pointer"
               
              >
                Logout
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
      <div className='min-h-screen' >
        {
            location.pathname==='/admin'&& <div className="w-full h-screen object-cover"  style={{
                background: `url(${"https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?cs=srgb&dl=pexels-asadphoto-1268855.jpg&fm=jpg"})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",}}>Welcome</div>
        }
           
        <Outlet/>
      </div>
      <footer className="h-[50px] mt-0 w-full bg-gray-800 text-white flex items-center justify-center relative bottom-0">
          <p>&copy; 2024 TravelMate. All rights reserved.</p>
        </footer>
    </div>
  )
}

export default AdminHomePage