import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "./../context/darkModeContext";
import { AuthContext } from "./../context/authContext";

const Navbar = () => {
  const { darkMode, toggleTheme } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="w-full h-16 flex items-center justify-between px-4 shadow-md bg-white dark:bg-gray-900 sticky top-0 z-50">
      {/* Left */}
      <div className="flex items-center gap-3 md:gap-4">
        <Link to="/" className="no-underline">
          <span className="font-bold text-lg md:text-xl text-purple-700 dark:text-purple-400">
            lamasocial
          </span>
        </Link>
        <HomeOutlinedIcon className="cursor-pointer text-gray-600 dark:text-gray-200 hidden sm:inline" />

        {darkMode === "dark" ? (
          <WbSunnyOutlinedIcon
            className="cursor-pointer text-yellow-400"
            onClick={toggleTheme}
          />
        ) : (
          <DarkModeOutlinedIcon
            className="cursor-pointer text-gray-600"
            onClick={toggleTheme}
          />
        )}

        <GridViewOutlinedIcon className="cursor-pointer text-gray-600 dark:text-gray-200 hidden sm:inline" />

        {/* Search (hidden on small screens) */}
        <div className="hidden md:flex items-center gap-2 border border-gray-300 rounded-full px-3 py-1 ml-4 bg-gray-100 dark:bg-gray-800">
          <SearchOutlinedIcon className="text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 md:gap-5">
        <PersonOutlinedIcon className="cursor-pointer text-gray-600 dark:text-gray-200 hidden sm:inline" />
        <EmailOutlinedIcon className="cursor-pointer text-gray-600 dark:text-gray-200 hidden sm:inline" />
        <NotificationsOutlinedIcon className="cursor-pointer text-gray-600 dark:text-gray-200 hidden sm:inline" />

        {/* User */}
        <div className="flex items-center gap-2">
          <img
            src={currentUser.profilePic}
            alt="profile"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="hidden sm:inline font-medium text-gray-700 dark:text-gray-200">
            {currentUser.name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
