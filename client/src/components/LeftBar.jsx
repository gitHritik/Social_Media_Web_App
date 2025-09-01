import Friends from "../assets/1.png";
import Groups from "../assets/2.png";
import Market from "../assets/3.png";
import Watch from "../assets/4.png";
import Memories from "../assets/5.png";
import Events from "../assets/6.png";
import Gaming from "../assets/7.png";
import Gallery from "../assets/8.png";
import Videos from "../assets/9.png";
import Messages from "../assets/10.png";
import Tutorials from "../assets/11.png";
import Courses from "../assets/12.png";
import Fund from "../assets/13.png";
import { AuthContext } from './../context/authContext';
import { useContext } from 'react';


const LeftBar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="hidden md:flex flex-col flex-[2] sticky top-[70px]  overflow-y-scroll no-scrollbar  bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="p-5">
        {/* User Info */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <img
              src={currentUser.profilePic}
              alt=""
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm">{currentUser.name}</span>
          </div>

          {/* Main Menu */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3 cursor-pointer">
              <img src={Friends} alt="" className="w-7 h-7" />
              <span className="text-sm">Friends</span>
            </div>
            <div className="flex items-center gap-3 cursor-pointer">
              <img src={Groups} alt="" className="w-7 h-7" />
              <span className="text-sm">Groups</span>
            </div>
            <div className="flex items-center gap-3 cursor-pointer">
              <img src={Market} alt="" className="w-7 h-7" />
              <span className="text-sm">Marketplace</span>
            </div>
            <div className="flex items-center gap-3 cursor-pointer">
              <img src={Watch} alt="" className="w-7 h-7" />
              <span className="text-sm">Watch</span>
            </div>
            <div className="flex items-center gap-3 cursor-pointer">
              <img src={Memories} alt="" className="w-7 h-7" />
              <span className="text-sm">Memories</span>
            </div>
          </div>

          <hr className="my-5 border-t border-gray-300 dark:border-gray-700" />

          {/* Shortcuts */}
          <div className="flex flex-col gap-5">
            <span className="text-xs uppercase tracking-wide text-gray-500">
              Your shortcuts
            </span>
            <div className="flex items-center gap-3 cursor-pointer">
              <img src={Events} alt="" className="w-7 h-7" />
              <span className="text-sm">Events</span>
            </div>
            <div className="flex items-center gap-3 cursor-pointer">
              <img src={Gaming} alt="" className="w-7 h-7" />
              <span className="text-sm">Gaming</span>
            </div>
            <div className="flex items-center gap-3 cursor-pointer">
              <img src={Gallery} alt="" className="w-7 h-7" />
              <span className="text-sm">Gallery</span>
            </div>
            <div className="flex items-center gap-3 cursor-pointer">
              <img src={Videos} alt="" className="w-7 h-7" />
              <span className="text-sm">Videos</span>
            </div>
            <div className="flex items-center gap-3 cursor-pointer">
              <img src={Messages} alt="" className="w-7 h-7" />
              <span className="text-sm">Messages</span>
            </div>
          </div>

          <hr className="my-5 border-t border-gray-300 dark:border-gray-700" />

          {/* Others */}
          <div className="flex flex-col gap-5">
            <span className="text-xs uppercase tracking-wide text-gray-500">
              Others
            </span>
            <div className="flex items-center gap-3 cursor-pointer">
              <img src={Fund} alt="" className="w-7 h-7" />
              <span className="text-sm">Fundraiser</span>
            </div>
            <div className="flex items-center gap-3 cursor-pointer">
              <img src={Tutorials} alt="" className="w-7 h-7" />
              <span className="text-sm">Tutorials</span>
            </div>
            <div className="flex items-center gap-3 cursor-pointer">
              <img src={Courses} alt="" className="w-7 h-7" />
              <span className="text-sm">Courses</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
