// Import necessary libraries and utilities
import { useContext } from 'react'; 
import Image from 'next/image'; 
import Link from 'next/link'; 
// Import assets, context, and utility functions
import images from '../assets'; // Placeholder images
import { NFTContext } from '../context/NFTContext'; // Context for NFT-related data
import { shortenAddress } from '../utils/shortenAddress'; // Utility to abbreviate wallet addresses


const NFTCard = ({ nft, onProfilePage }) => {
  // Destructure nftCurrency from the NFT context
  const { nftCurrency } = useContext(NFTContext);

  return (
    // Link the card to the NFT details page, passing the NFT object as a query parameter
    <Link href={{ pathname: '/nft-details', query: nft }}>
      <div className="flex-1 min-w-215 max-w-max xs:max-w-none sm:w-full sm:min-w-155 minmd:min-w-256 minlg:min-w-327 dark:bg-nft-black-3 bg-white rounded-2xl p-4 m-4 minlg:m-8 sm:my-2 sm:mx-2 cursor-pointer shadow-md">
        {/* NFT image section */}
        <div className="relative w-full h-52 sm:h-36 xs:h-56 minmd:h-60 minlg:h-300 rounded-2xl overflow-hidden">
          <Image
            src={nft.image || images[`nft${nft.i}`]} // Use NFT image or placeholder
            layout="fill"
            objectFit="cover"
            alt="nft01" 
          />
        </div>

        {/* NFT details section */}
        <div className="mt-3 flex flex-col">
          {/* NFT name */}
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm minlg:text-xl">
            {nft.name}
          </p>

          {/* NFT price and seller/owner details */}
          <div className="flexBetween mt-1 minlg:mt-3 flex-row xs:flex-col xs:items-start xs:mt-3">
            <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xs minlg:text-lg">
              {nft.price}
              <span className="font-normal"> {nftCurrency}</span> {/* Currency symbol */}
            </p>
            <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xs minlg:text-lg">
              {/* Display owner if onProfilePage, otherwise display seller */}
              {shortenAddress(onProfilePage ? nft.owner : nft.seller)}
            </p>
          </div>

          {/* Placeholder for additional details or actions */}
          <div className="mt-1 minlg:mt-3 flexBetween flex-row" />
        </div>
      </div>
    </Link>
  );
};

// Export the NFTCard component
export default NFTCard;
