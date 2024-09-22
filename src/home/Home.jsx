import React ,{useEffect, useState} from "react";
import {toast} from "react-toastify";
import { AxiosApi, URL } from "../AxiosApi";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";



// interface IRegister {
//   name?: string;
//   email?: string;
//   password?: string;
//   mobile?: string;
//   address?: string;
//   city?: string;

// }







const Home = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
      const settings1 = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
      };
      const navigateTo = useNavigate()
  const [show, setShow] = React.useState(false);

  const handleClick = () => {
    setShow(!show);
    setShow1(false);
  };

  const [show1, setShow1] = React.useState(false);

  const handleClick1 = () => {
    setShow1(!show1);
    setShow(false);
  };
  
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    address: "",
    city: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };


  const [profile , setProfile] = useState(null)

  const handleFileChange = (e) => {
    if (e.target.files) {
      setProfile(e.target.files[0]);
    }
  };



  const handleSubmit = async (e) => {
            e.preventDefault();
            const formData = new FormData();
            formData.append("username", data.name || "");
            formData.append("email", data.email || "");
            formData.append("Mobile", data.mobile || "");
            formData.append("password", data.password || "");
            formData.append("address", data.address || "");
            formData.append("city", data.city || "");
            formData.append("profile_pic", profile );

            try {
              const res = await AxiosApi.post("/registration", formData);
              console.log(res.data.message);
              toast.success(res.data.msg);
              setData({
                name: "",
                email: "",
                password: "",
                mobile: "",
                address: "",
                city: "",
              });
              show && setShow(false);
            } catch (error) {
              console.log(error);
              toast.error(error.response.data.msg);
            }

  }

  // login section

  const [login , setLogin] = useState({
    email: "",
    password: "",
  });


  const handleLogin = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

// admin login

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    if(login.email==="admin@gmail.com" && login.password==="admin"){
  try {
    const res= await AxiosApi.post(`/adminlogin`, {email: login.email,
      password: login.password,})
    console.log(res);
    toast.success(res.data.msg);
    navigateTo('/admin')
  } catch (error) {
    console.log(error);
  }
} else  try {
      const res = await AxiosApi.post("/login", {
        email: login.email,
        password: login.password,
      });
      // console.log(res.data.data);
      toast.success(res.data.msg);
      const data = res.data.data;
      sessionStorage.setItem("user", JSON.stringify(data));
      console.log(data);
      setLogin({
        email: "",
        password: "",
      });
      show1 && setShow1(false);
      navigateTo('/user')
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  }
  const [tweets, setTweets] =useState()
  // get user
  // const user = JSON.parse(sessionStorage.getItem('user'));
  const getTweets=async ()=>{
   // API call to fetch tweets data
    // Return the fetched tweets data
    try {
      
      const response= await AxiosApi.get(`/alltweets`)
      console.log(response.data);
      setTweets(response.data.data)
      // set tweets state with fetched data
    } catch (error) {
      console.error(error);
    }
  }
  // call getTweets function
  React.useEffect(()=>{
    getTweets()
  },[])
  const [allPlaces, setAllPlaces]=useState()
  const getAllPlaces=async()=>{
try {
  const response = await AxiosApi.get(`/`);
  console.log(response);
  setAllPlaces(response.data.data)
} catch (error) {
  console.log(error);
}
  }
  useEffect(()=>{
getAllPlaces()
  }, [])
  return (
    <div>
      {/* // 1st div show image with text  */}
      <div style={{ position: "sticky", top: "0px" }} className="z-10">
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
              <a href="/" className="text-blue-600 font-bold text-xl mr-4">
                Home
              </a>
              <a href="#tweet" className="text-blue-600 hover:text-blue-300 mr-4">
                Tweets
              </a>
              <a href="#about" className="text-blue-600 hover:text-blue-300 mr-4">
                About
              </a>
            </div>

            {/* Right side */}
            <div className="flex items-center">
              <p
               
                className="text-blue-600 hover:text-blue-300 mr-4 cursor-pointer"
                onClick={handleClick1}
              >
                Login
              </p>
              <p
                className="bg-white cursor-pointer text-blue-500 hover:text-blue-300 hover:bg-gray-100 text-sm rounded-full px-4 py-2"
                onClick={handleClick}
              >
                Register
              </p>
            </div>
          </div>
        </nav>
      </div>

      <div
        className=" h-[700px] w-screen"
        style={{
          backgroundImage: `url(${"https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?cs=srgb&dl=pexels-asadphoto-1268855.jpg&fm=jpg"})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className=" flex ">
          <div className=" mt-32 ml-10 ">
            <h1 className="text-4xl font-bold text-slate-800 mt-28">TravelMate</h1>
            <p className="text-black">
            Hybrid Recommender System for Tourism ,Your Ultimate Travel Companion for Seamless Adventures.
            </p>
          </div>
        </div>
      </div>

      {/* // 2nd div show some card in reaponsive  */}
      <div className=" h-[500px] w-screen ">
        <div className=" flex items-center justify-center ">
          <h1 className="text-2xl font-bold text-slate-800 mt-10 ml-10 uppercase">
           Places 
          </h1>
        </div>
     
        <div>
        <div className="w-full mt-5 p-4 h-72 gap-3">
  <Slider {...settings1}>
    {allPlaces&&allPlaces.map((item, index) => (
      <div key={index} className="px-2">
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
     </div></div>
      // <div key={index} className="px-2">
      //   <div className="border rounded-md p-3">
      //     <img
      //       src="https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?cs=srgb&dl=pexels-asadphoto-1268855.jpg&fm=jpg"
      //       alt=""
      //       className="w-full h-36 rounded-md"
      //     />
      //     <h1 className="text-2xl font-bold text-slate-800">Travel</h1>
      //     <p className="text-black">
      //       Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
      //       voluptas.
      //     </p>
      //   </div>
      // </div>
    ))}
  </Slider>
</div>

      </div>
</div>
      <div className=" h-[500px] w-screen bg-slate-400" id="tweet">
        <div className="">
          <div className=" flex items-center justify-center text-2xl p-2 uppercase font-bold  ">
          Tweets from users
          </div>
        </div>
        <Slider {...settings}>
        {tweets&&tweets.map((item,index)=><div>
              <div className=" flex " key={item.id}>
          <div className=" ml-5 mt-40">
            <h1 className="text-2xl font-bold text-white mt-10 ml-10 uppercase">
              {item.title}
            </h1>
            <p className="text-white">
              {item.tweet}
            </p>
          </div>
          <div className=" ml-20 mt-24 ">
            <img
            src={`${URL}/static/uploads/${item.photo}`}
            // src={`https://picsum.photos/id/${index+100}/200/300`}
              alt=""
              className=" w-[600px] h-[300px] rounded-lg"
            />
          </div>
        </div></div>)}
        </Slider>
      
      </div>

      {/* about page */}
      <div className=" h-[500px] w-screen  " id="about">
        <div className="bg-gray-100 min-h-screen p-8">
          <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div
              className="h-64 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?cs=srgb&dl=pexels-asadphoto-1268855.jpg&fm=jpg')`,
              }}
            ></div>
            <div className="p-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                About Us
              </h1>
              <p className="text-gray-600 text-lg mb-6">
                Welcome to our tourism website! We are dedicated to providing
                you with the best travel experiences and unforgettable
                adventures. Our mission is to make your trips as enjoyable and
                hassle-free as possible.
              </p>
              <p className="text-gray-600 text-lg mb-6">
                Whether you are looking for a relaxing beach holiday, an
                adventurous mountain trek, or a cultural city tour, we have
                something for everyone. Our experienced team is here to help you
                plan your perfect getaway.
              </p>
              <p className="text-gray-600 text-lg mb-6">
                Join us in exploring the world's most beautiful destinations and
                creating memories that will last a lifetime.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* register section like dialog type */}
      {show && (
        <div className="min-h-screen w-screen bg-black bg-opacity-70 fixed top-16 overflow-auto">
          {/* <div className=" flex items-center justify-center ">
            <h1 className="text-2xl font-bold text-white mt-10 ml-10 uppercase">Register Now</h1>
            
            </div> */}
          <div className=" flex items-center justify-center">
            <div className="  h-[600px] w-96 mt-2 rounded-md bg-white overflow-y-auto max-h-screen">
              <form onSubmit={handleSubmit}>
                <div className=" flex items-center justify-center ">
                  <h1 className="text-2xl font-bold text-slate-800 mt-10 ml-10 uppercase">
                    Register Now
                  </h1>
                </div>
                <div className=" flex items-center justify-center ">
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Your Name"
                    className="w-80 h-10 mt-5 rounded-md p-2 border"
                    onChange={handleChange}
                  />
                </div>
                <div className=" flex items-center justify-center ">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Your Email"
                    className="w-80 h-10 mt-5 rounded-md p-2 border"
                    onChange={handleChange}
                  />
                </div>
                <div className=" flex items-center justify-center ">
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter Your Password"
                    className="w-80 h-10 mt-5 rounded-md p-2 border"
                    onChange={handleChange}
                  />
                </div>
                <div className=" flex items-center justify-center ">
                  <input
                    type="text"
                    name="mobile"
                    placeholder="Enter Your Mobile Number"
                    className="w-80 h-10 mt-5 rounded-md p-2 border"
                    onChange={handleChange}
                  />
                </div>
                <div className=" flex items-center justify-center ">
                  <input
                    type="text"
                    name="address"
                    placeholder="Enter Your Address"
                    className="w-80 h-10 mt-5 rounded-md p-2 border"
                    onChange={handleChange}
                  />
                </div>
                <div className=" flex items-center justify-center ">
                  <input
                    type="text"
                    name="city"
                    placeholder="Enter Your city"
                    className="w-80 h-10 mt-5 rounded-md p-2 border"
                    onChange={handleChange}
                  />
                </div>{" "}
                <div className=" flex items-center justify-center ">
                  <input
                    type="file"
                    name="profile"
                    placeholder="Profile"
                    className="w-80 h-10 mt-5 rounded-md p-2 border"
                    onChange={handleFileChange}
                  />
                </div>
                <div className=" flex items-center justify-center ">
                  <button className="w-80 h-10 mt-5 rounded-md p-2 bg-blue-600 text-white">
                    Register
                  </button>
                </div>
                <div className=" flex items-center justify-center ">
                  <p className="text-black flex gap-2">
                    Already have an account?{" "}
                    <p  className="text-blue-600 cursor-pointer" onClick={handleClick1}>
                      Login
                    </p>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Login section */}
      {show1 && (
      <div className="h-screen w-screen bg-black bg-opacity-70 fixed top-16 overflow-auto">
          <div className="flex items-center justify-center">
            <div className="h-[400px] w-96 mt-10 rounded-md bg-white ">
              <form className=" p-6" onSubmit={handleSubmit1}>
                <div className=" flex items-center justify-center ">
                  <h1 className="text-2xl font-bold text-slate-800 mt-10 ml-10 uppercase">
                    Login Now
                  </h1>
                </div>
                <div className=" flex items-center justify">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Your Email"
                    className="w-80 h-10 mt-5 rounded-md p-2 border"
                    onChange={handleLogin}
                  />
                </div>
                <div className=" flex items-center justify">
                  <input
                    type="password"
                    placeholder="Enter Your Password"
                    className="w-80 h-10 mt-5 rounded-md p-2 border"
                    name="password"
                    onChange={handleLogin}
                  />
                </div>
                <div className=" flex items-center justify">
                  <button className="w-80 h-10 mt-5 rounded-md p-2 bg-blue-600 text-white">
                    Login
                  </button>
                </div>
                <div className=" flex items-center justify">
                  <p className="text-black flex gap-2">
                    Don't have an account?{" "}
                    <p  className="text-blue-600 cursor-pointer" onClick={handleClick}>
                      Register
                    </p>
                  </p>
                </div>
              </form>
            </div>
          </div>
      </div>
        )}
        {/* footer */}
        <footer className="h-[50px] mt-20 w-full bg-gray-800 text-white flex items-center justify-center">
          <p>&copy; 2024 TravelMate. All rights reserved.</p>
        </footer>
    </div>
  );
};

export default Home;
