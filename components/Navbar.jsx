// Importing necessary libraries and components
import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

import images from '../assets'; // Importing assets like images
import { NFTContext } from '../context/NFTContext'; // Importing NFTContext for state management
import Button from './Button'; // Importing a reusable Button component

// MenuItems Component: Generates the navigation menu items
const MenuItems = ({ isMobile, active, setActive, setIsOpen }) => {
  // Function to generate route paths based on the index
  const generateLink = (i) => {
    switch (i) {
      case 0:
        return '/';
      case 1:
        return '/created-nfts';
      case 2:
        return '/my-nfts';
      default:
        return '/';
    }
  };

  return (
    <ul className={`list-none flexCenter flex-row ${isMobile && 'flex-col h-full'}`}>
      {/* Mapping through the menu items */}
      {['Explore NFTs', 'Listed NFTs', 'My NFTs'].map((item, i) => (
        <li
          key={i}
          onClick={() => {
            setActive(item); // Set the active menu item
            if (isMobile) setIsOpen(false); // Close the menu on mobile
          }}
          className={`flex flex-row items-center font-poppins font-semibold text-base dark:hover:text-white hover:text-nft-dark mx-3
          ${active === item
            ? 'dark:text-white text-nft-black-1'
            : 'dark:text-nft-gray-3 text-nft-gray-2'} 
          ${isMobile && 'my-5 text-xl'}`}
        >
          {/* Link to the corresponding route */}
          <Link href={generateLink(i)}>{item}</Link>
        </li>
      ))}
    </ul>
  );
};

// ButtonGroup Component: Displays buttons for "Connect Wallet" or "Create NFT"
const ButtonGroup = ({ setActive, router }) => {
  const { connectWallet, currentAccount } = useContext(NFTContext); // Accessing context for wallet and account info

  return currentAccount ? (
    // If wallet is connected, show the "Create" button
    <div className="flexCenter">
      <Button
        btnName="Create"
        btnType="primary"
        classStyles="mx-2 rounded-xl"
        handleClick={() => {
          setActive(''); // Clear active menu item
          router.push('/create-nft'); // Navigate to the create NFT page
        }}
      />
    </div>
  ) : (
    // If no wallet connected, show the "Connect" button
    <Button
      btnName="Connect"
      btnType="outline"
      classStyles="mx-2 rounded-lg"
      handleClick={connectWallet} // Call the connect wallet function
    />
  );
};

// Function to check and update the active menu item based on the current route
const checkActive = (active, setActive, router) => {
  switch (router.pathname) {
    case '/':
      if (active !== 'Explore NFTs') setActive('Explore NFTs');
      break;
    case '/created-nfts':
      if (active !== 'Listed NFTs') setActive('Listed NFTs');
      break;
    case '/my-nfts':
      if (active !== 'My NFTs') setActive('My NFTs');
      break;
    case '/create-nft':
      if (active !== '') setActive('');
      break;
    default:
      setActive('');
  }
};

// Navbar Component: The main navigation bar
const Navbar = () => {
  const { theme, setTheme } = useTheme(); // Accessing theme context
  const [active, setActive] = useState('Explore NFTs'); // State to track the active menu item
  const [isOpen, setIsOpen] = useState(false); // State to track if the menu is open
  const router = useRouter(); // Accessing Next.js router

  // Effect to set the initial theme to dark
  useEffect(() => {
    setTheme('dark');
  }, []);

  // Effect to update active menu item when the route changes
  useEffect(() => {
    checkActive(active, setActive, router);
  }, [router.pathname]);

  // Effect to disable body scroll when the menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      document.body.style.overflow = 'visible'; // Enable scrolling
    }
  }, [isOpen]);

  return (
    <nav className="flexBetween w-full fixed z-10 p-4 flex-row border-b dark:bg-nft-dark bg-white dark:border-nft-black-1 border-nft-gray-1">
      {/* Logo Section */}
      <div className="flex flex-1 flex-row justify-start">
        <Link href="/">
          <div className="flexCenter md:hidden cursor-pointer" onClick={() => setActive('Explore NFTs')}>
            <Image src={images.logo02} objectFit="contain" width={32} height={32} alt="logo" />
            <p className=" dark:text-white text-nft-black-1 font-semibold text-lg ml-1">CryptoKet</p>
          </div>
        </Link>
        <Link href="/">
          <div
            className="hidden md:flex"
            onClick={() => {
              setActive('Explore NFTs');
              setIsOpen(false);
            }}
          >
            <Image src={images.logo02} objectFit="contain" width={32} height={32} alt="logo" />
          </div>
        </Link>
      </div>

      {/* Theme toggle, menu items, and buttons */}
      <div className="flex flex-initial flex-row justify-end">
        <div className="flex items-center mr-2">
          {/* Theme toggle */}
          <input
            type="checkbox"
            className="checkbox"
            id="checkbox"
            onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          />
          <label htmlFor="checkbox" className="flexBetween w-8 h-4 bg-black rounded-2xl p-1 relative label">
            <i className="fas fa-sun" />
            <i className="fas fa-moon" />
            <div className="w-3 h-3 absolute bg-white rounded-full ball" />
          </label>
        </div>

        <div className="md:hidden flex">
          {/* Desktop menu */}
          <ul className="list-none flexCenter flex-row">
            <MenuItems active={active} setActive={setActive} />
          </ul>
          <div className="ml-4">
            <ButtonGroup setActive={setActive} router={router} />
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="hidden md:flex ml-2">
        {!isOpen ? (
          // Menu icon
          <Image
            src={images.menu}
            objectFit="contain"
            width={25}
            height={25}
            alt="menu"
            onClick={() => setIsOpen(!isOpen)}
            className={theme === 'light' ? 'filter invert' : undefined}
          />
        ) : (
          // Close icon
          <Image
            src={images.cross}
            objectFit="contain"
            width={20}
            height={20}
            alt="close"
            onClick={() => setIsOpen(!isOpen)}
            className={theme === 'light' ? 'filter invert' : undefined}
          />
        )}

        {/* Mobile menu dropdown */}
        {isOpen && (
          <div className="fixed inset-0 top-65 dark:bg-nft-dark bg-white z-10 nav-h flex justify-between flex-col">
            <div className="flex-1 p-4">
              <MenuItems active={active} setActive={setActive} isMobile setIsOpen={setIsOpen} />
            </div>
            <div className="p-4 border-t dark:border-nft-black-1 border-nft-gray-1">
              <ButtonGroup setActive={setActive} router={router} />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
