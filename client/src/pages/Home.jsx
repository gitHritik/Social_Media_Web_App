import React from "react";
import Stories from './../components/Stories';
import Posts from './../components/Posts';
import Share from './../components/Share';

function Home() {
  return (
    <div className="bg-[#f6f3f3] dark:text-white dark:bg-[#333] px-[40px] py-[20px] min-h-[100%]">
      <Stories />
      <Share />
      <Posts />
    </div>
  );
}

export default Home;
