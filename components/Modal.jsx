import { useRef } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes'; // For light/dark theme handling

import images from '../assets'; // Asset images

const Modal = ({ header, body, footer, handleClose }) => {
  const modalRef = useRef(null); // Reference to the modal container
  const { theme } = useTheme(); // Get the current theme (light/dark)

  // Handle clicks outside the modal to close it
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      handleClose(); // Trigger the close callback when clicking outside
    }
  };

  return (
    // Background overlay for the modal; listens for outside clicks
    <div
      onClick={handleClickOutside} // Close the modal when clicking outside of it
      className="flexCenter fixed inset-0 z-10 bg-overlay-black animated fadeIn" // Overlay styling
    >
      {/* Modal container */}
      <div
        ref={modalRef} // Attach the reference to the modal container
        className="w-2/5 md:w-11/12 minlg:w-2/4 dark:bg-nft-dark bg-white flex flex-col rounded-lg"
      >
        {/* Close button at the top-right corner */}
        <div className="flex justify-end mt-4 mr-4 minlg:mt-6 minlg:mr-6">
          <div
            className="relative w-3 h-3 minlg:w-6 minlg:h-6 cursor-pointer"
            onClick={handleClose} // Close the modal when the close button is clicked
          >
            <Image
              src={images.cross} // Cross icon for closing the modal
              layout="fill" // Makes the image fill the container
              className={theme === 'light' ? 'filter invert' : undefined} // Adjust the icon styling based on theme
            />
          </div>
        </div>

        {/* Modal header */}
        <div className="flexCenter w-full text-center p-4">
          <h2 className="font-poppins dark:text-white text-nft-black-1 font-normal text-2xl">
            {header} {/* Dynamic header content */}
          </h2>
        </div>

        {/* Modal body */}
        <div className="p-10 sm:px-4 border-t border-b dark:border-nft-black-3 border-nft-gray-1">
          {body} {/* Dynamic body content */}
        </div>

        {/* Modal footer */}
        <div className="flexCenter p-4">
          {footer} {/* Dynamic footer content */}
        </div>
      </div>
    </div>
  );
};

export default Modal;
