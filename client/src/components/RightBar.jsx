const RightBar = () => {
  return (
    <div className="flex-[3] sticky top-[70px]  overflow-y-scroll no-scrollbar bg-gray-100 dark:bg-gray-800 hidden lg:block scrollbar-hide">
      <div className="p-5 space-y-5">

        {/* Suggestions */}
        <div className="shadow-md p-5 mb-5 bg-white dark:bg-gray-900 rounded-lg">
          <span className="text-gray-500 text-sm">Suggestions For You</span>
          <div className="flex items-center justify-between my-5">
            <div className="flex items-center gap-5 relative">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="font-medium text-gray-900 dark:text-gray-200">Hrk</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="bg-blue-500 text-white px-3 py-1 rounded">Follow</button>
              <button className="bg-red-500 text-white px-3 py-1 rounded">Dismiss</button>
            </div>
          </div>
          <div className="flex items-center justify-between my-5">
            <div className="flex items-center gap-5 relative">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="font-medium text-gray-900 dark:text-gray-200">Hrk</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="bg-blue-500 text-white px-3 py-1 rounded">Follow</button>
              <button className="bg-red-500 text-white px-3 py-1 rounded">Dismiss</button>
            </div>
          </div>
        </div>

        {/* Latest Activities */}
        <div className="shadow-md p-5 mb-5 bg-white dark:bg-gray-900 rounded-lg">
          <span className="text-gray-500 text-sm">Latest Activities</span>
          {Array(4).fill().map((_, i) => (
            <div key={i} className="flex items-center justify-between my-5">
              <div className="flex items-center gap-5 relative">
                <img
                  src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                  className="w-10 h-10 rounded-full object-cover"
                />
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  <span className="font-medium text-gray-900 dark:text-gray-200">Hrk</span>{" "}
                  changed their cover picture
                </p>
              </div>
              <span className="text-xs text-gray-400">1 min ago</span>
            </div>
          ))}
        </div>

        {/* Online Friends */}
        <div className="shadow-md p-5 mb-5 bg-white dark:bg-gray-900 rounded-lg">
          <span className="text-gray-500 text-sm">Online Friends</span>
          {Array(10).fill().map((_, i) => (
            <div key={i} className="flex items-center my-5">
              <div className="flex items-center gap-5 relative">
                <img
                  src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="w-3 h-3 rounded-full bg-green-500 absolute top-0 left-7" />
                <span className="font-medium text-gray-900 dark:text-gray-200">Hrk</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default RightBar;
