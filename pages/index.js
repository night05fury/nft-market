import React from 'react'
import { Banner } from '../components'

const Home = () => {
  return (
    <div className="flex justify-center sm:px-4 p-12" >
    <div className="w-full minmd:w-4/5">
      <Banner 
        name="Discover the world of NFTs. Buy, sell, and create digital assets."
        childStyles="text-white text-4xl sm:text-2xl xs=text-xl text-left font-bold" 
        parentStyles="justify-start mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-48 rounded-3xl"
        className=" "
      />
    </div>
    </div>

  );
};

export default Home;