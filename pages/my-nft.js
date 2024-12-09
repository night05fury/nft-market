import { useEffect, useState, useContext } from 'react';
import Image from 'next/image';

import { NFTContext } from '../context/NFTContext'; // Context for interacting with NFT data
import { shortenAddress } from '../utils/shortenAddress'; // Utility to shorten wallet addresses
import { Loader, NFTCard, SearchBar, Banner } from '../components'; // Reusable UI components
import images from '../assets'; // Image assets

const MyNFTs = () => {
  const { fetchMyNFTsOrCreatedNFTs, currentAccount } = useContext(NFTContext); // NFT fetching function and wallet address
  const [nfts, setNfts] = useState([]); // State to store fetched NFTs
  const [nftsCopy, setNftsCopy] = useState([]); // Copy of NFTs for search and reset
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [activeSelect, setActiveSelect] = useState('Recently Added'); // Current sort/filter selection

  // Fetch the user's NFTs when the component mounts
  useEffect(() => {
    fetchMyNFTsOrCreatedNFTs('fetchMyNFTs') // Fetch NFTs the user owns
      .then((items) => {
        setNfts(items); // Set the fetched NFTs
        setNftsCopy(items); // Store a copy for search/filtering
        setIsLoading(false); // Turn off loading state
      });
  }, []);

  // Handle sorting based on the active selection
  useEffect(() => {
    const sortedNfts = [...nfts]; // Create a shallow copy of the NFTs array

    switch (activeSelect) {
      case 'Price (low to high)':
        setNfts(sortedNfts.sort((a, b) => a.price - b.price)); // Sort NFTs by price ascending
        break;
      case 'Price (high to low)':
        setNfts(sortedNfts.sort((a, b) => b.price - a.price)); // Sort NFTs by price descending
        break;
      case 'Recently added':
        setNfts(sortedNfts.sort((a, b) => b.tokenId - a.tokenId)); // Sort by token ID (assuming recent = higher ID)
        break;
      default:
        setNfts(nfts); // Default state, no sort applied
        break;
    }
  }, [activeSelect]);

  // Handle search input
  const onHandleSearch = (value) => {
    const filteredNfts = nfts.filter(({ name }) => name.toLowerCase().includes(value.toLowerCase())); // Filter NFTs by name

    if (filteredNfts.length === 0) {
      setNfts(nftsCopy); // Reset to original if no matches
    } else {
      setNfts(filteredNfts); // Update state with filtered NFTs
    }
  };

  // Clear search and reset NFTs to the original list
  const onClearSearch = () => {
    if (nfts.length && nftsCopy.length) {
      setNfts(nftsCopy); // Reset NFTs to original list
    }
  };

  // Display loader while fetching data
  if (isLoading) {
    return (
      <div className="flexStart min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full flex justify-start items-center flex-col min-h-screen">
      {/* Banner Section */}
      <div className="w-full flexCenter flex-col">
        <Banner
          name="Your Nifty NFTs"
          childStyles="text-center mb-4"
          parentStyle="h-80 justify-center"
        />

        {/* User Profile Info */}
        <div className="flexCenter flex-col -mt-20 z-0">
          <div className="flexCenter w-40 h-40 sm:w-36 sm:h-36 p-1 bg-nft-black-2 rounded-full">
            <Image src={images.creator1} className="rounded-full object-cover" objectFit="cover" />
          </div>
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl mt-6">
            {shortenAddress(currentAccount)} {/* Display the current account's address */}
          </p>
        </div>
      </div>

      {/* No NFTs Owned Message */}
      {(!isLoading && nfts.length === 0) ? (
        <div className="flexCenter sm:p-4 p-16">
          <h1 className="font-poppins dark:text-white text-nft-black-1 text-3xl font-extrabold">No NFTs owned</h1>
        </div>
      ) : (
        /* NFTs List Section */
        <div className="sm:px-4 p-12 w-full minmd:w-4/5 flexCenter flex-col">
          {/* Search and Filter Bar */}
          <div className="flex-1 w-full flex flex-row sm:flex-col px-4 xs:px-0 minlg:px-8">
            <SearchBar
              activeSelect={activeSelect} // Currently selected sort option
              setActiveSelect={setActiveSelect} // Update sort option
              handleSearch={onHandleSearch} // Search handler
              clearSearch={onClearSearch} // Clear search handler
            />
          </div>

          {/* NFTs Display */}
          <div className="mt-3 w-full flex flex-wrap">
            {nfts.map((nft) => (
              <NFTCard key={`nft-${nft.tokenId}`} nft={nft} onProfilePage /> // Render NFT cards
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyNFTs;
