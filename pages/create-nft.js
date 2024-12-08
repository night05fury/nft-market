// Import required libraries and components
import { useState, useMemo, useCallback, useContext } from "react"; // React hooks for state, memoization, and context
import { create as ipfsHttpClient } from "ipfs-http-client"; // IPFS client for uploading files
import { useRouter } from "next/router";
import { useDropzone } from "react-dropzone"; // Library for drag-and-drop file uploads
import Image from "next/image";
import { useTheme } from "next-themes";

// Import context, components, and assets
import { NFTContext } from "../context/NFTContext"; // NFT context for global state
import { Button, Input, Loader } from "../components";

// Initialize the IPFS HTTP client
const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

// CreateItem component to handle NFT creation
const CreateItem = () => {
    const { createSale, isLoadingNFT } = useContext(NFTContext); // Extract functions and state from NFT context
    const [fileUrl, setFileUrl] = useState(null); // State for uploaded file URL
    const { theme } = useTheme(); // Access current theme
    const [formInput, updateFormInput] = useState({
        price: "",
        name: "",
        description: "",
    }); // State for form inputs
    const router = useRouter(); // Router instance for navigation

    // Function to upload files to IPFS
    const uploadToInfura = async (file) => {
        try {
            const added = await client.add({ content: file }); // Upload file
            const url = `https://ipfs.infura.io/ipfs/${added.path}`; // Generate file URL
            setFileUrl(url); // Save file URL
        } catch (error) {
            console.error("Error uploading file: ", error); // Handle errors
        }
    };

    // Callback for handling dropped files
    const onDrop = useCallback(async (acceptedFile) => {
        await uploadToInfura(acceptedFile[0]); // Upload the first file
    }, []);

    // Configure Dropzone for file uploads
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        onDrop,
        accept: "image/*", // Accept only image files
        maxSize: 5000000, // Max file size: 5 MB
    });

    // Dynamic styling based on drag-and-drop state
    const fileStyle = useMemo(
        () =>
            `dark:bg-nft-black-1 bg-white border dark:border-white border-nft-gray-2 flex flex-col items-center p-5 rounded-sm border-dashed  
     ${isDragActive ? "border-file-active" : ""} 
     ${isDragAccept ? "border-file-accept" : ""} 
     ${isDragReject ? "border-file-reject" : ""}`,
        [isDragActive, isDragReject, isDragAccept]
    );

    // Function to handle market creation
    const createMarket = async () => {
        const { name, description, price } = formInput; // Destructure form inputs
        if (!name || !description || !price || !fileUrl) return; // Ensure all fields are filled

        try {
            const data = JSON.stringify({ name, description, image: fileUrl }); // Prepare metadata
            const added = await client.add(data); // Upload metadata to IPFS
            const url = `https://ipfs.infura.io/ipfs/${added.path}`; // Get metadata URL

            await createSale(url, price); // Trigger sale creation
            router.push("/"); // Navigate to the home page
        } catch (error) {
            console.error("Error uploading file: ", error); // Handle errors
        }
    };

    // Show loader if NFT creation is in progress
    if (isLoadingNFT) {
        return (
            <div className="flexCenter" style={{ height: "51vh" }}>
                <Loader />
            </div>
        );
    }

    return (
        <div className="flex justify-center sm:px-4 p-12">
            <div className="w-3/5 md:w-full">
                {/* Page title */}
                <h1 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl">
                    Create new item
                </h1>

                {/* File upload section */}
                <div className="mt-16">
                    <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
                        Upload file
                    </p>
                    <div className="mt-4">
                        <div {...getRootProps()} className={fileStyle}>
                            <input {...getInputProps()} />
                            <div className="flexCenter flex-col text-center">
                                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
                                    JPG, PNG, GIF, SVG, WEBM, MP3, MP4. Max 100mb.
                                </p>

                                <div className="my-12 w-full flex justify-center">
                                    <Image
                                        src={images.upload}
                                        width={100}
                                        height={100}
                                        objectFit="contain"
                                        alt="file upload"
                                        className={theme === "light" ? "filter invert" : undefined}
                                    />
                                </div>

                                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm">
                                    Drag and Drop File
                                </p>
                                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm mt-2">
                                    Or browse media on your device
                                </p>
                            </div>
                        </div>
                        {/* Display preview of uploaded file */}
                        {fileUrl && (
                            <aside>
                                <div>
                                    <img src={fileUrl} alt="Asset_file" />
                                </div>
                            </aside>
                        )}
                    </div>
                </div>

                {/* Form inputs for name, description, and price */}
                <Input
                    inputType="input"
                    title="Name"
                    placeholder="Asset Name"
                    handleClick={(e) =>
                        updateFormInput({ ...formInput, name: e.target.value })
                    }
                />
                <Input
                    inputType="textarea"
                    title="Description"
                    placeholder="Asset Description"
                    handleClick={(e) =>
                        updateFormInput({ ...formInput, description: e.target.value })
                    }
                />
                <Input
                    inputType="number"
                    title="Price"
                    placeholder="Asset Price"
                    handleClick={(e) =>
                        updateFormInput({ ...formInput, price: e.target.value })
                    }
                />

                {/* Button to create NFT */}
                <div className="mt-7 w-full flex justify-end">
                    <Button
                        btnName="Create Item"
                        btnType="primary"
                        classStyles="rounded-xl"
                        handleClick={createMarket}
                    />
                </div>
            </div>
        </div>
    );
};

// Export CreateItem component
export default CreateItem;
