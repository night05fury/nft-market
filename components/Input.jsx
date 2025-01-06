import { useContext } from 'react'; // Import useContext for accessing the NFT context.

import { NFTContext } from '../context/NFTContext'; // Import the NFTContext for shared state.

const Input = ({ inputType, title, placeholder, handleClick }) => {
  const { nftCurrency } = useContext(NFTContext); // Access the NFT currency from the shared context.

  return (
    <div className="mt-10 w-full">
      {/* Display the title for the input field */}
      <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">{title}</p>

      {/* Conditional rendering based on inputType */}
      {inputType === 'number' ? (
        // Number input with a currency label
        <div className="dark:bg-nft-black-1 bg-white border dark:border-nft-black-1 border-nft-gray-2 rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3 flexBetween flex-row">
          <input
            type="number"
            className="flex-1 w-full dark:bg-nft-black-1 bg-white outline-none"
            placeholder={placeholder} // Placeholder text
            onChange={handleClick} // Event handler for changes
          />
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">{nftCurrency}</p> {/* Display NFT currency */}
        </div>
      ) : inputType === 'textarea' ? (
        // Textarea input for multi-line text
        <textarea
          rows={10} // Set number of rows for the textarea
          className="dark:bg-nft-black-1 bg-white border dark:border-nft-black-1 border-nft-gray-2 rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3"
          placeholder={placeholder} // Placeholder text
          onChange={handleClick} // Event handler for changes
        />
      ) : (
        // Default input for single-line text
        <input
          className="dark:bg-nft-black-1 bg-white border dark:border-nft-black-1 border-nft-gray-2 rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3"
          placeholder={placeholder} // Placeholder text
          onChange={handleClick} // Event handler for changes
        />
      )}
    </div>
  );
};

export default Input;
