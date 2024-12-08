import { useEffect, useState, useContext } from 'react';

// Importing context and components
import { NFTContext } from '../context/NFTContext'; 
import { Loader, NFTCard } from '../components';

const CreatorDashboard = () => {
  // Destructure `fetchMyNFTsOrCreatedNFTs` from NFTContext
  const { fetchMyNFTsOrCreatedNFTs } = useContext(NFTContext);

  // State variables to store NFT data and loading state
  const [nfts, setNfts] = useState([]); // Array to store NFTs fetched
  const [isLoading, setIsLoading] = useState(true); // Loading state for data fetch

  // useEffect runs on component mount to fetch NFTs listed by the creator
  useEffect(() => {
    fetchMyNFTsOrCreatedNFTs('fetchItemsListed') // Calls the method with appropriate query type
      .then((items) => {
        setNfts(items); // Sets the fetched items to state
        setIsLoading(false); // Stops the loader once data is fetched
      });
  }, []);

  // Show loader while data is being fetched
  if (isLoading) {
    return (
      <div className="flexStart min-h-screen">
        <Loader /> {/* Loader component for visual feedback */}
      </div>
    );
  }

  // Show a message if no NFTs are listed for sale
  if (!isLoading && nfts.length === 0) {
    return (
      <div className="flexCenter sm:p-4 p-16 min-h-screen">
        <h1 className="font-poppins dark:text-white text-nft-black-1 text-3xl font-extrabold">
          No NFTs Listed for Sale
        </h1>
      </div>
    );
  }

  // Render the list of NFTs if data is available
  return (
    <div className="flex justify-center sm:px-4 p-12 min-h-screen">
      <div className="w-full minmd:w-4/5">
        <div className="mt-4">
          <h2 className="font-poppins dark:text-white text-nft-black-1 text-2xl mt-2 ml-4 sm:ml-2 font-semibold">
            NFTs Listed for Sale
          </h2>
          {/* Render each NFT as an NFTCard component */}
          <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
            {nfts.map((nft) => (
              <NFTCard key={`nft-${nft.tokenId}`} nft={nft} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorDashboard;
