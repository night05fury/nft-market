// Banner component to display a title with optional custom styles and decorative elements.
const Banner = ({ name, childStyles, parentStyle }) => (
  <div className={`relative w-full flex items-center z-0 overflow-hidden nft-gradient ${parentStyle}`}>
    {/* Displays the banner title with custom styles */}
    <p className={`font-bold text-5xl text-white font-poppins leading-70 ${childStyles}`}>{name}</p>

    {/* Decorative circles for visual appeal */}
    <div className="absolute w-48 h-48 sm:w-32 sm:h-32 rounded-full -top-9 -left-16 -z-5 white-bg" />
    <div className="absolute w-72 h-72 sm:w-56 sm:h-56 rounded-full -bottom-24 -right-14 -z-5 white-bg" />
  </div>
);

// Export the component
export default Banner;
