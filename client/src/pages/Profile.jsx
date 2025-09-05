/* eslint-disable no-unused-vars */
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from './../components/Posts';
import { makeRequest } from './../axios.js';
import { useLocation } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from "../context/authContext.jsx";
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import Update from './../components/Update';
import { useState } from 'react';



const Profile = () => {

  const userId = parseInt(useLocation().pathname.split('/')[2]);

  const [updateOpen, setUpdateOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { isPending, error, data } = useQuery({
    queryKey: ['users'],
    queryFn: () =>
      makeRequest().get(`/users/find/${userId}`).then((res) => {
        return res.data;
      }),
  })

  const { data: relationShipdata } = useQuery({
    queryKey: ['relationships'],
    queryFn: () =>
      makeRequest().get(`/relationships?userId=${userId}`).then((res) => {
        return res.data;
      }),
  })

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (following) => {
      if (following) return makeRequest().delete(`/relationships?userId=${userId}`)
      return makeRequest().post("/relationships", { userId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries("[relationships]");
    },
  });


  const handleFollow = () => {
    mutation.mutate(relationShipdata.includes(currentUser.id));
  }


  return (
    isPending ? (
      "loading"
    ) : (
      <>
        <div className="bg-gray-100 dark:bg-gray-900">
          {/* Cover + Profile Picture */}
          <div className="w-full h-[300px] relative">
            <img
              src={`/uploads/${data?.coverPic}`}
              className="w-full h-full object-cover"
            />
            <img
              src={`/uploads/${data?.profilePic}`}
              alt="profile"
              className="w-[200px] h-[200px] rounded-full object-cover absolute left-0 right-0 mx-auto top-[200px] border-4 border-white dark:border-gray-800"
            />
          </div>

          {/* Profile Info Container */}
          <div className="px-[70px] py-3 sm:px-3 md:px-6 ">
            <div className="h-[160px] shadow-md rounded-2xl  bg-white dark:bg-gray-800 dark:text-gray-100 p-5  flex items-center align-middle justify-between mb-5  sm:h-[30vh] sm:mt-24">

              {/* Left - Social Links */}
              <div className="flex-1 flex gap-2 flex-wrap">
                <a href="http://facebook.com" className="text-gray-500 dark:text-gray-400">
                  <FacebookTwoToneIcon fontSize="large" />
                </a>
                <a href="http://instagram.com" className="text-gray-500 dark:text-gray-400">
                  <InstagramIcon fontSize="large" />
                </a>
                <a href="http://twitter.com" className="text-gray-500 dark:text-gray-400">
                  <TwitterIcon fontSize="large" />
                </a>
                <a href="http://linkedin.com" className="text-gray-500 dark:text-gray-400">
                  <LinkedInIcon fontSize="large" />
                </a>
                <a href="http://pinterest.com" className="text-gray-500 dark:text-gray-400">
                  <PinterestIcon fontSize="large" />
                </a>
              </div>

              {/* Center - User Info */}
              <div className="flex-1 flex flex-col items-center mt-3 gap-2">
                <span className="text-xl font-semibold">{data?.name}</span>
                <div className="w-full flex items-center justify-around text-gray-500 dark:text-gray-400 text-sm gap-1">
                  <div className="flex items-center ">
                    <PlaceIcon fontSize="small" />
                    <span>{data?.city}</span>
                  </div>
                  <div className="flex items-center">
                    <LanguageIcon fontSize="small" />
                    <span>{data?.website}</span>
                  </div>
                </div>
                {userId == currentUser.id ? (<button onClick={() => setUpdateOpen(true)} className="bg-blue-600 text-white px-5 py-2 rounded-md cursor-pointer"> Update</button>) : <button onClick={handleFollow} className="bg-blue-600 text-white px-5 py-2 rounded-md cursor-pointer">
                  {relationShipdata?.includes(currentUser.id) ? "Following" : "Follow"}
                </button>}
              </div>

              {/* Right - Actions */}
              <div className="flex-1 flex items-center justify-end gap-3">
                <EmailOutlinedIcon />
                <MoreVertIcon />
              </div>
            </div>

            {/* Posts */}
            <Posts userId={userId} />
          </div>
        </div>
        {updateOpen && <Update setOpen={setUpdateOpen} user={data} />}
      </>
    )
  );
};

export default Profile;
