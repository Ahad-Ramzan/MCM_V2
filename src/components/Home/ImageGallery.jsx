// components/ImageGallery.tsx
export default function ImageGallery() {
  return (
    <div className="Container flex flex-col lg:flex-row mb-6 lg:mb-8 lg:space-x-4 space-y-4 lg:space-y-0 w-full">
      <div className="bg-gray-100 h-60 w-full"></div>
      <div className="bg-gray-100 h-60 w-full"></div>
      <div className="bg-gray-100 h-60 w-full"></div>
    </div>
  );
}



// export default function ImageGallery() {
//   return (
//     <div className="Container flex flex-col lg:flex-row mb-6 lg:mb-8 lg:space-x-4 space-y-4 lg:space-y-0 w-full">
//       <div className="bg-gray-100 h-60 w-full">
//         <img
//           src="https://via.placeholder.com/600x400?text=Image+1"
//           alt="Dummy Image 1"
//           className="w-full h-full object-cover"
//         />
//       </div>
//       <div className="bg-gray-100 h-60 w-full">
//         <img
//           src="https://via.placeholder.com/600x400?text=Image+2"
//           alt="Dummy Image 2"
//           className="w-full h-full object-cover"
//         />
//       </div>
//       <div className="bg-gray-100 h-60 w-full">
//         <img
//           src="https://via.placeholder.com/600x400?text=Image+3"
//           alt="Dummy Image 3"
//           className="w-full h-full object-cover"
//         />
//       </div>
//     </div>
//   );
// }
