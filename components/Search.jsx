import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes'; // For handling light and dark mode

import images from '../assets'; // Asset images

const SearchBar = ({ activeSelect, setActiveSelect, handleSearch, clearSearch }) => {
  const [search, setSearch] = useState(''); // Current search value
  const [toggle, setToggle] = useState(false); // State to manage the visibility of the dropdown menu
  const [debouncedSearch, setDebouncedSearch] = useState(search); // Debounced value to optimize search
  const { theme } = useTheme(); // Access current theme (light or dark)

  // Debounce the search input to minimize API calls or heavy processing
  useEffect(() => {
    const timer = setTimeout(() => setSearch(debouncedSearch), 1000); // Update `search` after 1 second

    return () => clearTimeout(timer); // Clear the timeout if `debouncedSearch` changes
  }, [debouncedSearch]);

  // Handle search or reset functionality whenever `search` changes
  useEffect(() => {
    if (search) {
      handleSearch(search); // Trigger search callback with the current value
    } else {
      clearSearch(); // Reset search if the input is cleared
    }
  }, [search]);

  return (
    <>
      {/* Search Input Section */}
      <div className="flex-1 flexCenter dark:bg-nft-black-2 bg-white border dark:border-nft-black-2 border-nft-gray-2 py-3 px-4 rounded-md">
        <Image
          src={images.search} // Search icon
          objectFit="contain"
          width={20}
          height={20}
          alt="search"
          className={theme === 'light' ? 'filter invert' : undefined} // Adjust icon based on theme
        />
        <input
          type="text"
          placeholder="Search item here" // Placeholder text
          className="dark:bg-nft-black-2 bg-white mx-4 w-full font-poppins dark:text-white text-nft-black-1 font-normal text-xs outline-none"
          onChange={(e) => setDebouncedSearch(e.target.value)} // Update debounced search value on input
          value={debouncedSearch} // Bind input value to `debouncedSearch`
        />
      </div>

      {/* Dropdown for Sorting Options */}
      <div
        onClick={() => setToggle(!toggle)} // Toggle dropdown visibility
        className="relative flexBetween ml-4 sm:ml-0 sm:mt-2 min-w-190 cursor-pointer dark:bg-nft-black-2 bg-white border dark:border-nft-black-2 border-nft-gray-2 py-3 px-4 rounded-md"
      >
        <p className="font-poppins dark:text-white text-nft-black-1 font-normal text-xs">{activeSelect}</p> {/* Currently selected filter */}
        <Image
          src={images.arrow} // Arrow icon for dropdown
          objectFit="contain"
          width={15}
          height={15}
          alt="arrow"
          className={theme === 'light' ? 'filter invert' : undefined} // Adjust icon based on theme
        />

        {toggle && (
          <div className="absolute top-full left-0 right-0 w-full mt-3 z-10 dark:bg-nft-black-2 bg-white border dark:border-nft-black-2 border-nft-gray-2 py-3 px-4 rounded-md">
            {['Recently added', 'Price (low to high)', 'Price (high to low)'].map((item) => (
              <p
                className="font-poppins dark:text-white text-nft-black-1 font-normal text-xs my-3 cursor-pointer"
                onClick={() => setActiveSelect(item)} // Update the selected sorting option
                key={item} // Unique key for each dropdown item
              >
                {item}
              </p>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBar;
