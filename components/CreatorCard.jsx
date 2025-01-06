import { useContext } from 'react';
import Image from 'next/image';

import images from '../assets'; // Asset images
import { NFTContext } from '../context/NFTContext'; // Context for NFT-related data

const CreatorCard = ({ rank, creatorImage, creatorName, creatorEths }) => {
  const { nftCurrency } = useContext(NFTContext); // Get the NFT currency from the context

  return (
    // Card container
    <div className="min-w-190 minlg:min-w-240 dark:bg-nft-black-3 bg-white border dark:border-nft-black-3 border-nft-gray-1 rounded-3xl flex flex-col p-4 m-4">
      
      {/* Rank indicator */}
      <div className="w-8 h-8 minlg:w-10 minlg:h-10 rounded-full bg-nft-red-violet flexCenter">
        <p className="font-poppins text-white font-semibold text-base minlg:text-lg ">
          {rank} {/* Displays the creator's rank */}
        </p>
      </div>

      {/* Creator's profile image */}
      <div className="my-2 flex justify-center">
        <div className="relative w-20 h-20 minlg:w-28 minlg:h-28">
          <Image
            src={creatorImage} // Dynamic image source for the creator
            layout="fill" // Ensures the image fills the container
            objectFit="cover" // Crops the image to maintain aspect ratio
            alt="creator" // Alt text for accessibility
            className="rounded-full" // Makes the image circular
          />
          {/* Verified tick badge */}
          <div className="absolute w-4 h-4 minlg:w-7 minlg:h-7 bottom-2 -right-0">
            <Image
              src={images.tick} // Tick icon to signify verification
              layout="fill" // Ensures the icon fills the container
              objectFit="contain" // Maintains the icon's aspect ratio
              alt="tick" // Alt text for accessibility
            />
          </div>
        </div>
      </div>

      {/* Creator details */}
      <div className="mt-3 minlg:mt-7 text-center flexCenter flex-col">
        {/* Creator's name */}
        <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base">
          {creatorName} {/* Displays the creator's name */}
        </p>
        
        {/* Creator's ETH earnings */}
        <p className="mt-1 font-poppins dark:text-white text-nft-black-1 font-semibold text-base">
          {creatorEths.toFixed(2)} {/* Shows ETH value rounded to 2 decimals */}
          <span className="font-normal"> {nftCurrency}</span> {/* Displays the NFT currency */}
        </p>
      </div>
    </div>
  );
};

export default CreatorCard;
