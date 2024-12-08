import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { NFTContext } from '../context/NFTContext'; // Context for NFT operations
import { shortenAddress } from '../utils/shortenAddress'; // Utility function for formatting addresses
import { Button, Loader, Modal } from '../components'; // Components used in the UI
import images from '../assets'; // Predefined images

// Component to render the payment details in the modal
const PaymentBodyCmp = ({ nft, nftCurrency }) => (
  <div className="flex flex-col">
    {/* Header: Item and Subtotal */}
    <div className="flexBetween">
      <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base minlg:text-xl">Item</p>
      <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base minlg:text-xl">Subtotal</p>
    </div>

    {/* NFT details */}
    <div className="flexBetweenStart my-5">
      <div className="flex-1 flexStartCenter">
        <div className="relative w-28 h-28">
          {/* NFT Image */}
          <Image src={nft.image || images[`nft${nft.i}`]} layout="fill" objectFit="cover" />
        </div>
        {/* Seller and NFT name */}
        <div className="flexCenterStart flex-col ml-5">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm minlg:text-xl">{shortenAddress(nft.seller)}</p>
          <p className="font-poppins dark:text-white text-nft-black-1 text-sm minlg:text-xl font-normal">{nft.name}</p>
        </div>
      </div>
      {/* Price */}
      <div>
        <p className="font-poppins dark:text-white text-nft-black-1 text-sm minlg:text-xl font-normal">
          {nft.price} <span className="font-semibold">{nftCurrency}</span>
        </p>
      </div>
    </div>

    {/* Footer: Total */}
    <div className="flexBetween mt-10">
      <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base minlg:text-xl">Total</p>
      <p className="font-poppins dark:text-white text-nft-black-1 text-base minlg:text-xl font-normal">
        {nft.price} <span className="font-semibold">{nftCurrency}</span>
      </p>
    </div>
  </div>
);

const AssetDetails = () => {
  // Context and state variables
  const { nftCurrency, buyNft, currentAccount, isLoadingNFT } = useContext(NFTContext);
  const [nft, setNft] = useState({ image: '', itemId: '', name: '', owner: '', price: '', seller: '' });
  const [paymentModal, setPaymentModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Disable body scroll when modals are open
  useEffect(() => {
    document.body.style.overflow = paymentModal || successModal ? 'hidden' : 'visible';
  }, [paymentModal, successModal]);

  // Fetch NFT details from the router query parameters
  useEffect(() => {
    if (!router.isReady) return;
    setNft(router.query); // Load NFT data from the query
    setIsLoading(false);
  }, [router.isReady]);

  // Checkout process: Trigger buying of the NFT
  const checkout = async () => {
    await buyNft(nft);
    setPaymentModal(false);
    setSuccessModal(true);
  };

  // Show loader while data is being fetched
  if (isLoading) return <Loader />;

  return (
    <div className="relative flex justify-center md:flex-col min-h-screen">
      {/* Left section: NFT image */}
      <div className="relative flex-1 flexCenter sm:px-4 p-12 border-r md:border-r-0 md:border-b dark:border-nft-black-1 border-nft-gray-1">
        <div className="relative w-557 minmd:w-2/3 minmd:h-2/3 sm:w-full sm:h-300 h-557">
          <Image src={nft.image || images[`nft${nft.i}`]} objectFit="cover" className="rounded-xl shadow-lg" layout="fill" />
        </div>
      </div>

      {/* Right section: NFT details */}
      <div className="flex-1 justify-start sm:px-4 p-12 sm:pb-4">
        {/* Title */}
        <div className="flex flex-row sm:flex-col">
          <h2 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl minlg:text-3xl">{nft.name}</h2>
        </div>

        {/* Creator details */}
        <div className="mt-10">
          <p className="font-poppins dark:text-white text-nft-black-1 text-xs minlg:text-base font-normal">Creator</p>
          <div className="flex flex-row items-center mt-3">
            <div className="relative w-12 h-12 minlg:w-20 minlg:h-20 mr-2">
              <Image src={images.creator1} objectFit="cover" className="rounded-full" />
            </div>
            <p className="font-poppins dark:text-white text-nft-black-1 text-sm minlg:text-lg font-semibold">{shortenAddress(nft.seller)}</p>
          </div>
        </div>

        {/* Description */}
        <div className="mt-10 flex flex-col">
          <div className="w-full border-b dark:border-nft-black-1 border-nft-gray-1 flex flex-row">
            <p className="font-poppins dark:text-white text-nft-black-1 font-medium text-base mb-2">Details</p>
          </div>
          <div className="mt-3">
            <p className="font-poppins dark:text-white text-nft-black-1 font-normal text-base">{nft.description}</p>
          </div>
        </div>

        {/* Buttons for actions */}
        <div className="flex flex-row sm:flex-col mt-10">
          {currentAccount === nft.seller.toLowerCase() ? (
            <p className="font-poppins dark:text-white text-nft-black-1 font-normal text-base border border-gray p-2">
              You cannot buy your own NFT
            </p>
          ) : currentAccount === nft.owner.toLowerCase() ? (
            <Button
              btnName="List on Marketplace"
              btnType="primary"
              classStyles="mr-5 sm:mr-0 sm:mb-5 rounded-xl"
              handleClick={() => router.push(`/resell-nft?id=${nft.tokenId}&tokenURI=${nft.tokenURI}`)}
            />
          ) : (
            <Button
              btnName={`Buy for ${nft.price} ${nftCurrency}`}
              btnType="primary"
              classStyles="mr-5 sm:mr-0 sm:mb-5 rounded-xl"
              handleClick={() => setPaymentModal(true)}
            />
          )}
        </div>
      </div>

      {/* Modals */}
      {paymentModal && (
        <Modal
          header="Check Out"
          body={<PaymentBodyCmp nft={nft} nftCurrency={nftCurrency} />}
          footer={(
            <div className="flex flex-row sm:flex-col">
              <Button btnName="Checkout" btnType="primary" handleClick={checkout} classStyles="mr-5 sm:mr-0 sm:mb-5 rounded-xl" />
              <Button btnName="Cancel" btnType="outline" handleClick={() => setPaymentModal(false)} classStyles="rounded-lg" />
            </div>
          )}
          handleClose={() => setPaymentModal(false)}
        />
      )}

      {isLoadingNFT && <LoaderModal header="Buying NFT..." />}
      {successModal && <SuccessModal nft={nft} />}
    </div>
  );
};

export default AssetDetails;
