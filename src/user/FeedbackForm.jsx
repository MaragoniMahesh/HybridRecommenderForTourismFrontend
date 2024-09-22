import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AxiosApi } from "../AxiosApi";
import Loading from "../Loading";

// import { toast } from "react-toastify";
// import AxiosInstance from "../AxiosInstance";

const FeedBackForm = () => {
  const navigation= useNavigate()
  const [rating, setRating] = useState(0);
  const user = JSON.parse(sessionStorage.getItem("user"));
const [location, setLocation] = useState();
  const [text, setText] = useState();
  const handleStarClick = (starValue) => {
    setRating(starValue);
  };
  const [loading, setLoading] = useState(false)
  const rating_Function = async () => {
setLoading(true)
    // const formData = new FormData();
    // formData.append("rating", rating);
    // formData.append("message", text);
    // formData.append("place", location);
    try {
      const res = await AxiosApi.post(
        `/rating/${user.id}`,
        {"rating": rating, "message": text, "place": location}
      );
      console.log(res);
      toast.success(res.data.message);
      toast.info("Thank you for your valuable feedback");
      navigation("/user")
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
    }
  };
  return (
    <div>
      <div className="  bg-opacity-70  flex  justify-center p-5">
        <div className="bg-white  flex space-x-4 rounded-lg border border-blue-500 p-10">
          <div>
            <div className="">
              <h3 className="text-center text-xl italic">Give Rating</h3>
              <div className="w-full  ">
                <div className="flex justify-center p-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={` p-1 ${
                        star <= rating ? "text-yellow-400" : "text-gray-200"
                      } text-5xl cursor-pointer`}
                      onClick={() => handleStarClick(star)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="48px"
                        viewBox="0 -960 960 960"
                        width="48px"
                        fill="currentColor"
                      >
                        <path d="m384-334 96-74 96 74-36-122 90-64H518l-38-124-38 124H330l90 64-36 122ZM233-120l93-304L80-600h304l96-320 96 320h304L634-424l93 304-247-188-247 188Zm247-369Z" />
                      </svg>
                    </span>
                  ))}
                </div>
                {/* <p className="text-center italic ">
                  {rating === 0
                    ? "Please rate"
                    : `Explain in detail`}
                </p> */}
              </div>
              <div className="w-full">
                <label htmlFor="" className="w-full">Location</label>
                <input type="text" onChange={(e)=>setLocation(e.target.value)} className="w-full border border-blue-500 h-10 rounded-lg p-3" />
                {/* <textarea
                  className="w-64 ring-2 rounded-lg h-36 p-3"
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Share your feedback "
                ></textarea> */}
              </div>
              <div className="mb-4">
    <label htmlFor="message" className="text-sm leading-7 text-gray-600">
      Message
    </label>
    <textarea
      id="message"
      onChange={(e)=> setText(e.target.value)}
      name="message"
      className="h-32 w-full resize-none rounded border border-gray-300 bg-white py-1 px-3 text-base leading-6 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
      />
   
  </div>
            { loading?<Loading/>: <div className="w-full flex justify-center p-3">
                <button
                  className="bg-purple-700 text-white h-10 w-36  rounded-xl"
                  onClick={rating_Function}
                >
                  Submit
                </button>
              </div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedBackForm;
