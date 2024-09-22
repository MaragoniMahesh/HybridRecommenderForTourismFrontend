import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Home from "./home/Home";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserHomePage from "./user/UserHomePage";
import ViewTweets from "./user/ViewTweets";
import ErrorPage from "./ErrorPage";
import ViewUsers from "./user/ViewUsers";
import AddTweet from "./user/AddTweet";
import FeedBackForm from "./user/FeedbackForm";
import ViewFollowers from "./user/ViewFollowers";
import ChatApp from "./user/ChatApp";
import ViewProfile from "./user/ViewProfile";
import AdminHomePage from "./admin/AdminHomePage";
import AddPlace from "./admin/AddPlace";
import ViewPlaces from "./admin/ViewPlaces";
import ViewRatings from "./admin/ViewRatings";
import BarGraph from "./admin/BarGraph";
import { ToastContainer } from "react-toastify";
import ViewFollowing from "./user/ViewFollowing";
import ViewUsersAdmin from "./admin/ViewUsersAdmin";
import ViewTweetsAdmin from "./admin/ViewTweetsAdmin";
import ViewPlacesUser from "./user/ViewPlacesUser";
function App() {
  return (
    <div className="">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/admin" element={<AdminHomePage />}>
            <Route path="add-place" element={<AddPlace />} />
            <Route path="users" element={<ViewUsersAdmin />} />
            <Route path="tweets" element={<ViewTweetsAdmin />} />
            <Route path="places" element={<ViewPlaces />} />
            <Route path="ratings" element={<ViewRatings />} />

            <Route path="graphs" element={<BarGraph />} />

            <Route path="*" element={<ErrorPage />} />
          </Route>
          <Route path="/user" element={<UserHomePage />}>
            <Route path="profile" element={<ViewProfile />} />
            <Route path='recommendation' element={<ViewPlacesUser/>}/>
            <Route path="chat" element={<ChatApp />} />
            <Route path="followers" element={<ViewFollowers />} />
            <Route path="followings" element={<ViewFollowing />} />
            <Route path="ratings" element={<FeedBackForm />} />
            <Route path="tweets" element={<AddTweet />} />
            <Route path="people" element={<ViewUsers />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="timeline" element={<ViewTweets />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
