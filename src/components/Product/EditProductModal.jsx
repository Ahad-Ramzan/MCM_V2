// // components/EditProductModal.js
// import React, { useState, useEffect } from 'react'
// import {
//   getBrandAllData,
//   getCategoriesAllData,
//   getProductsById,
//   updateProducts,
// } from '@/apis/products'
// import toast from 'react-hot-toast'
// import { FiUpload, FiX, FiImage, FiVideo } from 'react-icons/fi'

// const EditProductModal = ({ productId, onClose, onUpdate }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     reference: '',
//     summary: '',
//     regularPrice: '',
//     salePrice: '',
//     saleQuantity: '',
//     soldItems: '',
//     stock: '',
//     description: '',
//     thumbnail: null,
//     gallery: [],
//     video: null,
//     sku: '',
//     brand: '',
//     category: '',
//   })
//   const [thumbnailPreview, setThumbnailPreview] = useState(null)
//   const [galleryPreview, setGalleryPreview] = useState([])
//   const [videoPreview, setVideoPreview] = useState(null)
//   const [categories, setCategories] = useState([])
//   const [brands, setBrands] = useState([])
//   const [activeTab, setActiveTab] = useState('general')
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setIsLoading(true)
//         // Fetch product data
//         const productData = await getProductsById(productId)
//         setFormData({
//           name: productData.product_name || '',
//           reference: productData.reference || '',
//           summary: productData.product_summary || '',
//           regularPrice: productData.regular_price || '',
//           salePrice: productData.sale_price || '',
//           saleQuantity: productData.sale_quantity || '',
//           soldItems: productData.sold_items || '',
//           stock: productData.stock || '',
//           description: productData.product_description || '',
//           thumbnail: null,
//           gallery: [],
//           video: null,
//           sku: productData.SKU || '',
//           brand: productData.brand?.toString() || '',
//           category: productData.category?.toString() || '',
//         })

//         // Fetch categories and brands
//         const [categoriesData, brandsData] = await Promise.all([
//           getCategoriesAllData(),
//           getBrandAllData(),
//         ])

//         setCategories(categoriesData)
//         setBrands(brandsData)
//       } catch (err) {
//         toast.error('Failed to fetch data')
//         console.error(err)
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchData()
//   }, [productId])

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleThumbnailChange = (e) => {
//     const file = e.target.files[0]
//     if (!file) return

//     setFormData((prev) => ({ ...prev, thumbnail: file }))

//     const reader = new FileReader()
//     reader.onload = () => setThumbnailPreview(reader.result)
//     reader.readAsDataURL(file)
//   }

//   const handleGalleryChange = (e) => {
//     const files = e.target.files
//     if (!files.length) return

//     const selectedFiles = Array.from(files).slice(0, 4 - galleryPreview.length)
//     if (selectedFiles.length === 0) {
//       toast.error('You can upload maximum 4 images')
//       return
//     }

//     setFormData((prev) => ({
//       ...prev,
//       gallery: [...prev.gallery, ...selectedFiles],
//     }))

//     const newPreviews = []
//     selectedFiles.forEach((file) => {
//       const reader = new FileReader()
//       reader.onload = () => {
//         newPreviews.push(reader.result)
//         if (newPreviews.length === selectedFiles.length) {
//           setGalleryPreview((prev) => [...prev, ...newPreviews])
//         }
//       }
//       reader.readAsDataURL(file)
//     })
//   }

//   const removeGalleryImage = (index) => {
//     const newGallery = [...formData.gallery]
//     const newPreviews = [...galleryPreview]
//     newGallery.splice(index, 1)
//     newPreviews.splice(index, 1)
//     setFormData((prev) => ({ ...prev, gallery: newGallery }))
//     setGalleryPreview(newPreviews)
//   }

//   const handleVideoChange = (e) => {
//     const file = e.target.files[0]
//     if (!file) return

//     setFormData((prev) => ({ ...prev, video: file }))

//     const reader = new FileReader()
//     reader.onload = () => setVideoPreview(reader.result)
//     reader.readAsDataURL(file)
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     if (!formData.name || !formData.reference || !formData.regularPrice) {
//       toast.error('Please fill all required fields.')
//       return
//     }

//     const productData = new FormData()
//     productData.append('product_name', formData.name)
//     productData.append('reference', formData.reference)
//     productData.append('regular_price', parseFloat(formData.regularPrice))
//     productData.append('sale_price', parseFloat(formData.salePrice))
//     productData.append('sale_quantity', parseInt(formData.saleQuantity))
//     productData.append('sold_items', parseInt(formData.soldItems))
//     productData.append('stock', parseInt(formData.stock))
//     productData.append('product_summary', formData.summary)
//     productData.append('product_description', formData.description)
//     productData.append('SKU', formData.sku)
//     productData.append('brand', formData.brand)
//     productData.append('category', formData.category)

//     if (formData.thumbnail) {
//       productData.append('product_thumbnail', formData.thumbnail)
//     }

//     formData.gallery.forEach((file) => {
//       productData.append('product_gallery', file)
//     })

//     if (formData.video) {
//       productData.append('product_video', formData.video)
//     }

//     try {
//       await updateProducts(productId, productData)
//       toast.success('Product updated successfully!')
//       onUpdate() // Notify parent component to refresh data
//       onClose() // Close the modal
//     } catch (error) {
//       toast.error('Failed to update product.')
//     }
//   }

//   if (isLoading) {
//     return (
//       <div className="modal-content">
//         <div className="modal-body text-center p-5">
//           <div className="spinner-border text-primary" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="modal-dialog modal-lg">
//       <div className="modal-content">
//         <div className="modal-header">
//           <h5 className="modal-title">Edit Product</h5>
//           <button
//             type="button"
//             className="btn-close"
//             onClick={onClose}
//           ></button>
//         </div>
//         <div className="modal-body">
//           <form onSubmit={handleSubmit}>
//             {/* Tab Navigation */}
//             <ul className="nav nav-tabs mb-4">
//               <li className="nav-item">
//                 <button
//                   className={`nav-link ${activeTab === 'general' ? 'active' : ''}`}
//                   onClick={() => setActiveTab('general')}
//                   type="button"
//                 >
//                   General
//                 </button>
//               </li>
//               <li className="nav-item">
//                 <button
//                   className={`nav-link ${activeTab === 'images' ? 'active' : ''}`}
//                   onClick={() => setActiveTab('images')}
//                   type="button"
//                 >
//                   Images
//                 </button>
//               </li>
//               <li className="nav-item">
//                 <button
//                   className={`nav-link ${activeTab === 'meta' ? 'active' : ''}`}
//                   onClick={() => setActiveTab('meta')}
//                   type="button"
//                 >
//                   Meta
//                 </button>
//               </li>
//             </ul>

//             {/* General Tab */}
//             {activeTab === 'general' && (
//               <div className="row">
//                 <div className="col-md-6">
//                   <div className="mb-3">
//                     <label className="form-label">Product Name *</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label className="form-label">Reference *</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       name="reference"
//                       value={formData.reference}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label className="form-label">Regular Price *</label>
//                     <input
//                       type="number"
//                       className="form-control"
//                       name="regularPrice"
//                       value={formData.regularPrice}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label className="form-label">Sale Price</label>
//                     <input
//                       type="number"
//                       className="form-control"
//                       name="salePrice"
//                       value={formData.salePrice}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </div>
//                 <div className="col-md-6">
//                   <div className="mb-3">
//                     <label className="form-label">Sale Quantity</label>
//                     <input
//                       type="number"
//                       className="form-control"
//                       name="saleQuantity"
//                       value={formData.saleQuantity}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label className="form-label">Sold Items</label>
//                     <input
//                       type="number"
//                       className="form-control"
//                       name="soldItems"
//                       value={formData.soldItems}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label className="form-label">Stock</label>
//                     <input
//                       type="number"
//                       className="form-control"
//                       name="stock"
//                       value={formData.stock}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label className="form-label">SKU</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       name="sku"
//                       value={formData.sku}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </div>
//                 <div className="col-12">
//                   <div className="mb-3">
//                     <label className="form-label">Summary</label>
//                     <textarea
//                       className="form-control"
//                       name="summary"
//                       rows="3"
//                       value={formData.summary}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label className="form-label">Description</label>
//                     <textarea
//                       className="form-control"
//                       name="description"
//                       rows="5"
//                       value={formData.description}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Images Tab */}
//             {activeTab === 'images' && (
//               <div className="row">
//                 <div className="col-12">
//                   <div className="mb-3">
//                     <label className="form-label">Thumbnail</label>
//                     <div className="file-upload">
//                       <label className="file-upload-label">
//                         <input
//                           type="file"
//                           accept="image/*"
//                           onChange={handleThumbnailChange}
//                           className="file-upload-input"
//                         />
//                         <div className="file-upload-content">
//                           <FiUpload className="me-2" />
//                           {thumbnailPreview
//                             ? 'Change thumbnail'
//                             : 'Upload thumbnail'}
//                         </div>
//                       </label>
//                     </div>
//                     {thumbnailPreview && (
//                       <div className="mt-2">
//                         <img
//                           src={thumbnailPreview}
//                           alt="Thumbnail preview"
//                           className="img-thumbnail"
//                           style={{ maxHeight: '150px' }}
//                         />
//                       </div>
//                     )}
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label">Gallery (Max 4 images)</label>
//                     <div className="file-upload">
//                       <label className="file-upload-label">
//                         <input
//                           type="file"
//                           accept="image/*"
//                           multiple
//                           onChange={handleGalleryChange}
//                           className="file-upload-input"
//                           disabled={galleryPreview.length >= 4}
//                         />
//                         <div className="file-upload-content">
//                           <FiImage className="me-2" />
//                           {galleryPreview.length >= 4
//                             ? 'Maximum reached'
//                             : `Upload images (${galleryPreview.length}/4)`}
//                         </div>
//                       </label>
//                     </div>
//                     {galleryPreview.length > 0 && (
//                       <div className="row mt-2">
//                         {galleryPreview.map((src, index) => (
//                           <div
//                             className="col-3 mb-2 position-relative"
//                             key={index}
//                           >
//                             <img
//                               src={src}
//                               alt={`Gallery ${index}`}
//                               className="img-thumbnail w-100"
//                               style={{ height: '80px', objectFit: 'cover' }}
//                             />
//                             <button
//                               type="button"
//                               className="btn btn-sm btn-danger position-absolute top-0 end-0"
//                               style={{ transform: 'translate(30%, -30%)' }}
//                               onClick={() => removeGalleryImage(index)}
//                             >
//                               <FiX />
//                             </button>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label">Product Video</label>
//                     <div className="file-upload">
//                       <label className="file-upload-label">
//                         <input
//                           type="file"
//                           accept="video/*"
//                           onChange={handleVideoChange}
//                           className="file-upload-input"
//                         />
//                         <div className="file-upload-content">
//                           <FiVideo className="me-2" />
//                           {videoPreview ? 'Change video' : 'Upload video'}
//                         </div>
//                       </label>
//                     </div>
//                     {videoPreview && (
//                       <div className="mt-2">
//                         <video
//                           controls
//                           className="img-thumbnail w-100"
//                           style={{ maxHeight: '200px' }}
//                         >
//                           <source src={videoPreview} type="video/mp4" />
//                           Your browser doesn't support HTML5 video.
//                         </video>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Meta Tab */}
//             {activeTab === 'meta' && (
//               <div className="row">
//                 <div className="col-md-6">
//                   <div className="mb-3">
//                     <label className="form-label">Brand</label>
//                     <select
//                       className="form-select"
//                       name="brand"
//                       value={formData.brand}
//                       onChange={handleChange}
//                     >
//                       <option value="">Select brand</option>
//                       {brands.map((brand) => (
//                         <option key={brand.id} value={brand.id}>
//                           {brand.brand_name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//                 <div className="col-md-6">
//                   <div className="mb-3">
//                     <label className="form-label">Category *</label>
//                     <select
//                       className="form-select"
//                       name="category"
//                       value={formData.category}
//                       onChange={handleChange}
//                       required
//                     >
//                       <option value="">Select category</option>
//                       {categories.map((cat) => (
//                         <option key={cat.id} value={cat.id}>
//                           {cat.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//               </div>
//             )}

//             <div className="modal-footer">
//               <button
//                 type="button"
//                 className="btn btn-secondary"
//                 onClick={onClose}
//               >
//                 Close
//               </button>
//               <button type="submit" className="btn btn-primary">
//                 Save Changes
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default EditProductModal
