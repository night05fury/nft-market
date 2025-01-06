import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import { NFTContext } from '../context/NFTContext'; // NFT operations context
import { Button, Input, Loader } from '../components'; // Reusable UI components

const ResellNFT = () => {
  const { createSale, isLoadingNFT } = useContext(NFTContext); // Context methods and loading state
  const [price, setPrice] = useState(''); // State to hold the new price of the NFT
  const [image, setImage] = useState(''); // State to hold the NFT image
  const router = useRouter();
  const { id, tokenURI } = router.query; // NFT ID and metadata URI passed via query parameters

  // Fetch NFT metadata using the token URI
  const fetchNFT = async () => {
    if (!tokenURI) return; // Avoid fetching if no token URI is available

    const { data } = await axios.get(tokenURI); // Fetch metadata from the provided URI

    setPrice(data.price); // Set the existing price (if provided in metadata)
    setImage(data.image); // Set the image URL from metadata
  };

  // Fetch NFT data when the component is mounted or when `id` changes
  useEffect(() => {
    fetchNFT();
  }, [id]);

  // Handle NFT reselling
  const resell = async () => {
    await createSale(tokenURI, price, true, id); // Trigger NFT sale creation
    router.push('/'); // Redirect to the homepage after successful resell
  };

  // Display loader while NFT data or actions are loading
  if (isLoadingNFT) {
    return (
      <div className="flexCenter" style={{ height: '51vh' }}>
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-3/5 md:w-full">
        {/* Page Title */}
        <h1 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl">Resell NFT</h1>

        {/* Input for setting the new price */}
        <Input
          inputType="number"
          title="Price"
          placeholder="Asset Price"
          handleClick={(e) => setPrice(e.target.value)}
        />

        {/* Display NFT image if available */}
        {image && <img className="rounded mt-4" width="350" src={image} />}

        {/* Resell button */}
        <div className="mt-7 w-full flex justify-end">
          <Button
            btnName="List NFT"
            btnType="primary"
            classStyles="rounded-xl"
            handleClick={resell}
          />
        </div>
      </div>
    </div>
  );
};

export default ResellNFT;
