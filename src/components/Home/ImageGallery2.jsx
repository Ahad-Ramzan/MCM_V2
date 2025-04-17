export default function ImageGallery2() {
  return (
    <div className="Container mb-6 lg:mb-8 flex flex-col lg:flex-row w-full gap-4">
      {/* Left Section: 8/12 on large screens */}
      <div className="bg-gray-100 h-48 w-full lg:w-8/12"></div>

      {/* Right Section: 4/12 on large screens */}
      <div className="bg-gray-100 h-48 w-full lg:w-4/12"></div>
    </div>
  );
}
