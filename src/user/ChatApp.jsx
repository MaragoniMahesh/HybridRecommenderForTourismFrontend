import React, { useEffect, useState } from "react";
import { AxiosApi, URL } from "../AxiosApi";
import moment from "moment";
const ChatApp = () => {
  const [currentUser, setCurrentUser] = useState();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [followings, setFollowings] = useState([]);
  const getfollowings = async () => {
    try {
      const results = await AxiosApi.get(`followings/${user.id}`);
      setFollowings(results.data.data);
      console.log(results);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getfollowings();
  }, []);
  const [allMessages, setAllMessages] = useState();
  const getMessages = async () => {
    try {
      const result = await AxiosApi.get(`/chat/${user.id}/${currentUser}`);
      console.log(result);
      setAllMessages(result.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getMessages();
  },[currentUser])
  const [text, setText] = useState();
  const [image, setImage] = useState();
  const sendMessage = async () => {
    try {
      const formData = new FormData();
      formData.append("message", text);
      if (image) {
        formData.append("photo", image);
      }
      const result = await AxiosApi.post(`/chat/${user.id}/${currentUser}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(result);
      setText("");
      setImage(null);
      getMessages()
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <div className=" p-10 ">
        <div className="grid grid-cols-12 border border-blue-500 rounded-lg">
          <div className="col-span-6">
            <div className="p-10 ">
              <div className="overflow-y-scroll h-[500px] ">
                <ul role="list" className="divide-y divide-gray-100 ">
                  {/* {[1, 2, 3, 4, 5].map((index) => (
                    <li
                      className={`"flex justify-between gap-x-6 py-5 cursor-pointer" ${
                        currentUser === index ? "bg-gray-200 rounded-lg" : ""
                      }`}
                      onClick={() => setCurrentUser(index)}
                    >
                      <button className="p-2">
                        {" "}
                        <div className="flex min-w-0 gap-x-4">
                          <img
                            className="h-12 w-12 flex-none rounded-full bg-gray-50"
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                          <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                              Leslie Alexander
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              leslie.alexander@example.com
                            </p>
                          </div>
                        </div>
                      </button>
                    </li>
                  ))} */}
                  {followings ?
                    followings.map((user) => (
                      <li  className={`"flex justify-between gap-x-6 py-5 cursor-pointer" ${
                        currentUser === user.following_id ? "bg-gray-200 rounded-lg" : ""
                      }`}
                      onClick={() => setCurrentUser(user.following_id)}
                    >
                      <button className="p-2">
                        <div className="flex min-w-0 gap-x-4">
                          <img
                            className="h-12 w-12 flex-none rounded-full bg-gray-50"
src={`${URL}/static/uploads/${user.profile_pic}`}
                            // src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />

                          <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                              {user?.username}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              {user?.email}
                            </p>
                          </div>
                        </div> </button>
                      </li>
                    )): <p className="text-center flex justify-center items-center text-green-800">currently you are not following any user Please Follow</p>}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-span-6  overflow-y-scroll p-10 h-[500px] ">
          {currentUser?  <div className="">
              <div
                className="py-20  flex flex-grow flex-col px-12 justify-end rounded "
                style={{ backgroundColor: "#e5ddd5" }}
              >
               {allMessages&&allMessages.map((item)=> item.sender===user.id?<div key={item.id} className="ml-auto rounded-lg rounded-tr-none my-1 p-2 text-sm bg-green-300 flex flex-col relative speech-bubble-right">
                  {item.photo&& <p><img src={`${URL}/static/uploads/${item.photo}`} target="_blank"/></p>}
                  <p className="">
                   {item.message}
                  </p>
                  <p className="text-gray-600 text-xs text-right leading-none">
                  {moment(item.created_at,'ddd, DD MMM YYYY HH:mm:ss [GMT]').local().format('Do MMM HH:mm')}
                  </p>
                </div>:<div className="mr-auto rounded-lg rounded-tl-none my-1 p-2 text-sm bg-white flex flex-col relative speech-bubble-left">
                 {item.photo&& <p><img src={`${URL}/static/uploads/${item.photo}`} target="_blank"/></p>}
                  <p> {item.message}</p>
                  <p className="text-gray-600 text-xs text-right leading-none">
                  {moment(item.created_at, 'ddd, DD MMM YYYY HH:mm:ss [GMT]').local().format('Do MMM HH:mm')}
                  </p>
                </div>)}
                
                {/* <div className="ml-auto rounded-lg rounded-tr-none my-1 p-2 text-sm bg-green-300 flex flex-col relative speech-bubble-right">
                  <p className="">
                    Dude WTF was up with that plane you were on!!!?
                  </p>
                  <p className="text-gray-600 text-xs text-right leading-none">
                    8:00 AM
                  </p>
                </div>
                <div className="mr-auto rounded-lg rounded-tl-none my-1 p-2 text-sm bg-white flex flex-col relative speech-bubble-left">
                  <p>LOL I Know right </p>
                  <p className="text-gray-600 text-xs text-right leading-none">
                    8:45 AM
                  </p>
                </div>
                <div className="ml-auto rounded-lg rounded-tr-none my-1 p-2 text-sm bg-green-300 flex flex-col relative speech-bubble-right">
                  <p className="">Hey man what should we do this weekend?</p>
                  <p className="text-gray-600 text-xs text-right leading-none">
                    8:00 AM
                  </p>
                </div>
                <div className="mr-auto rounded-lg rounded-tl-none my-1 p-2 text-sm bg-white flex flex-col relative speech-bubble-left">
                  <p>Steal the declaration of independence?...</p>
                  <p className="text-gray-600 text-xs text-right leading-none">
                    8:45 AM
                  </p>
                </div>
                <div className="ml-auto rounded-lg rounded-tr-none my-1 p-2 text-sm bg-green-300 flex flex-col relative speech-bubble-right">
                  <p className="">
                    Do you still have that car from gone in 60 seconds? Can I
                    borrow it please.
                  </p>
                  <p className="text-gray-600 text-xs text-right leading-none">
                    8:00 AM
                  </p>
                </div>
                <div className="mr-auto rounded-lg rounded-tl-none my-1 p-2 text-sm bg-white flex flex-col relative speech-bubble-left">
                  <p>Yeah dude for sure</p>
                  <p className="text-gray-600 text-xs text-right leading-none">
                    8:45 AM
                  </p>
                </div>
                <div className="ml-auto rounded-lg rounded-tr-none my-1 p-2 text-sm bg-green-300 flex flex-col relative speech-bubble-right">
                  <p className="">
                    Do you still have that car from gone in 60 seconds? Can I
                    borrow it please.
                  </p>
                  <p className="text-gray-600 text-xs text-right leading-none">
                    8:00 AM
                  </p>
                </div>
                <div className="mr-auto rounded-lg rounded-tl-none my-1 p-2 text-sm bg-white flex flex-col relative speech-bubble-left">
                  <p>Yeah dude for sure</p>
                  <p className="text-gray-600 text-xs text-right leading-none">
                    8:45 AM
                  </p>
                </div>
                <div className="ml-auto rounded-lg rounded-tr-none my-1 p-2 text-sm bg-green-300 flex flex-col relative speech-bubble-right">
                  <p className="">
                    Do you still have that car from gone in 60 seconds? Can I
                    borrow it please.
                  </p>
                  <p className="text-gray-600 text-xs text-right leading-none">
                    8:00 AM
                  </p>
                </div>
                <div className="mr-auto rounded-lg rounded-tl-none my-1 p-2 text-sm bg-white flex flex-col relative speech-bubble-left">
                  <p>Yeah dude for sure</p>
                  <p className="text-gray-600 text-xs text-right leading-none">
                    8:45 AM
                  </p>
                </div>
                <div className="ml-auto rounded-lg rounded-tr-none my-1 p-2 text-sm bg-green-300 flex flex-col relative speech-bubble-right">
                  <p className="">
                    Do you still have that car from gone in 60 seconds? Can I
                    borrow it please.
                  </p>
                  <p className="text-gray-600 text-xs text-right leading-none">
                    8:00 AM
                  </p>
                </div>
                <div className="mr-auto rounded-lg rounded-tl-none my-1 p-2 text-sm bg-white flex flex-col relative speech-bubble-left">
                  <p>Yeah dude for sure</p>
                  <p className="text-gray-600 text-xs text-right leading-none">
                    8:45 AM
                  </p>
                </div> */}
              </div>
              {/* input box */}
              <div className=" flex  sticky -bottom-10">
                <input
                  type="text"
                  value={text}
                  onChange={(e)=>setText(e.target.value)}
                  className="w-5/6 border-2 border-gray-700 rounded-full p-3 h-10 "
                />
                <span>
                  <button className="relative right-8 top-1">
                    <label htmlFor="file">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="30px"
                        viewBox="0 -960 960 960"
                        width="30px"
                        fill="#000000"
                      >
                        <path d="M720-330q0 104-73 177T470-80q-104 0-177-73t-73-177v-370q0-75 52.5-127.5T400-880q75 0 127.5 52.5T580-700v350q0 46-32 78t-78 32q-46 0-78-32t-32-78v-370h80v370q0 13 8.5 21.5T470-320q13 0 21.5-8.5T500-350v-350q-1-42-29.5-71T400-800q-42 0-71 29t-29 71v370q-1 71 49 120.5T470-160q70 0 119-49.5T640-330v-390h80v390Z" />
                      </svg>
                      <input type="file" className="hidden" id="file"  onChange={(e)=>setImage(e.target.files[0])} />
                    </label>
                  </button>
                </span>
                <span className="-ml-5 w-1/6">
                  <button className=" w-10 h-10 p-1 rounded-full bg-green-700" onClick={sendMessage}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="35px"
                      viewBox="0 -960 960 960"
                      width="35px"
                      fill="#FFFFFF"
                      className=""
                    >
                      <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
                    </svg>
                  </button>
                </span>
              </div>
            </div>:<p className="text-red-500 text-center text-lg italic">Select user please....!</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
