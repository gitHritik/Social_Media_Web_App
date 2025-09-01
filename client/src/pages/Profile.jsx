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


const Profile = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900">
      {/* Cover + Profile Picture */}
      <div className="w-full h-[300px] relative">
        <img
          src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="cover"
          className="w-full h-full object-cover"
        />
        <img
          src="https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
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
            <span className="text-xl font-semibold">Loream 1</span>
            <div className="w-full flex items-center justify-around text-gray-500 dark:text-gray-400 text-sm gap-1">
              <div className="flex items-center ">
                <PlaceIcon fontSize="small" />
                <span>Indian</span>
              </div>
              <div className="flex items-center">
                <LanguageIcon fontSize="small" />
                <span>.dev</span>
              </div>
            </div>
            <button className="bg-blue-600 text-white px-5 py-2 rounded-md cursor-pointer">
              Follow
            </button>
          </div>

          {/* Right - Actions */}
          <div className="flex-1 flex items-center justify-end gap-3">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>

        {/* Posts */}
        <Posts />
      </div>
    </div>
  );
};

export default Profile;
