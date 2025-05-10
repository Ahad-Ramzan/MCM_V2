'use client'
import React, { useEffect, useState } from 'react'
import ContainerDefault from '@/components/SuperAdmin/layouts/ContainerDefault'
import HeaderDashboard from '@/components/SuperAdmin/shared/headers/HeaderDashboard'
import { createProducts, getAllCategories } from '@/apis/products'
import toast, { Toaster } from 'react-hot-toast'

// Initial state for form
const initialFormState = {
  name: '',
  reference: '',
  summary: '',
  regularPrice: '',
  salePrice: '',
  saleQuantity: '',
  soldItems: '',
  stock: '',
  description: '',
  thumbnail: null,
  gallery: [],
  video: null, // changed from string to file
  sku: '',
  // status: '',
  brand: '',
  // tags: '',
  category: '',
}

const CreateProductPage = () => {
  const [formData, setFormData] = useState(initialFormState)
  // const [categories,setCategories] =()
  console.log(formData, 'formdata------')

  // Handle form field changes-
  // const handleChange = (e) => {
  //   const { name, value } = e.target
  //   setFormData((prev) => ({ ...prev, [name]: value }))

  // }

  const [galleryPreview, setGalleryPreview] = useState([])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e, fieldName, isMultiple = false) => {
    const files = e.target.files
    if (!files.length) return

    if (isMultiple) {
      setFormData((prev) => ({ ...prev, [fieldName]: files }))
      const previews = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      )
      setGalleryPreview(previews)
    } else {
      setFormData((prev) => ({ ...prev, [fieldName]: files[0] }))
    }
  }

  // Handle file inputs (thumbnail, gallery, and video)
  // const handleFileChange = (e, fieldName, isMultiple = false) => {
  //   const files = e.target.files
  //   if (!files.length) return
  //   if (isMultiple) {
  //     setFormData((prev) => ({ ...prev, [fieldName]: files }))
  //   } else {
  //     setFormData((prev) => ({ ...prev, [fieldName]: files[0] }))
  //   }
  // }

  // Form submission logic
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Validation for required fields
  //   if (!formData.name || !formData.reference || !formData.regularPrice) {
  //     toast.error("Please fill all required fields.");
  //     return;
  //   }

  //   // Prepare FormData for submission (handling files as well)
  //   const productData = new FormData();
  //   productData.append("product_name", formData.name);
  //   productData.append("reference", formData.reference);
  //   productData.append("regular_price", formData.regularPrice);
  //   productData.append("sale_price", formData.salePrice);
  //   productData.append("sale_quantity", formData.saleQuantity);
  //   productData.append("sold_items", formData.soldItems);
  //   productData.append("product_summary", formData.summary);
  //   productData.append("product_description", formData.description);

  //   // Append thumbnail file (if selected)
  //   if (formData.thumbnail) productData.append("product_thumbnail", formData.thumbnail);

  //   // Append gallery files (if selected)
  //   if (formData.gallery.length) {
  //     Array.from(formData.gallery).forEach((file, index) => {
  //       productData.append(`product_gallery[${index}]`, file);
  //     });
  //   }

  //   // Append video file (if selected)
  //   if (formData.video) {
  //     productData.append("product_video", formData.video);
  //   }

  //   productData.append("brand", formData.brand);
  //   productData.append("category", formData.category);
  //   productData.append("status", formData.status);
  //   // productData.append("sku", formData.sku);
  //   productData.append("tags", formData.tags.split(",").map((tag) => tag.trim()));
  //   console.log(productData,"productData----")

  //   for (let [key, value] of productData.entries()) {
  //     console.log(`${key}:`, value,"new data");
  //   }

  //   try {
  //     // Send request to API
  //     const response = await createProducts(productData);
  //     console.log(productData,"proddata")
  //     toast.success("Product created successfully!");
  //     console.log("Product created:", response);
  //     setFormData(initialFormState); // Reset form after successful submission
  //   } catch (error) {
  //     toast.error("Failed to create product.");
  //     console.error("Error creating product:", error.message);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Basic validation
    if (!formData.name || !formData.reference || !formData.regularPrice) {
      toast.error('Please fill all required fields.')
      return
    }

    const productData = new FormData()

    productData.append('product_name', formData.name)
    productData.append('reference', formData.reference)
    productData.append('regular_price', parseFloat(formData.regularPrice))
    productData.append('sale_price', parseFloat(formData.salePrice))
    productData.append('sale_quantity', parseInt(formData.saleQuantity))
    productData.append('sold_items', parseInt(formData.soldItems))
    productData.append('stock', parseInt(formData.stock))
    productData.append('product_summary', formData.summary)
    productData.append('product_description', formData.description)
    productData.append('SKU', formData.sku)
    // productData.append('status', formData.status)
    productData.append('brand', parseInt(formData.brand))
    productData.append('category', parseInt(formData.category))
    // productData.append('tags', formData.tags) // Keep as comma-separated string

    // Append thumbnail
    if (formData.thumbnail) {
      productData.append('product_thumbnail', formData.thumbnail)
    }

    // Append gallery
    if (formData.gallery.length > 0) {
      Array.from(formData.gallery).forEach((file, index) => {
        productData.append(`product_gallery`, file)
      })
    }

    // Append video
    if (formData.video) {
      productData.append('product_video', formData.video)
    }

    // Optional: Add a fixed stock value if required
    // productData.append('stock', 999) // Or get it from form

    try {
      const response = await createProducts(productData)
      toast.success('Product created successfully!')
      // console.log('Product created:', response)
      setFormData(initialFormState)
    } catch (error) {
      toast.error('Failed to create product.')
    }
  }

  // useEffect(()=>{
  //   // createProducts()

  // },[])

  const fetchData = async () => {
    try {
      const response = await getAllCategories()
      // console.log(response, 'ecom category---')
      // setCategories(response) // Store in state
    } catch (error) {
      // console.error('Failed to fetch categories:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <ContainerDefault title="Create new product">
      <HeaderDashboard
        title="Create Product"
        description="Martfury Create New Product"
      />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000, // default for all toasts
        }}
      />{' '}
      <section className="ps-new-item">
        <form
          className="ps-form ps-form--new-product"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="ps-form__content">
            <div className="row">
              {/* Left Column - Product Details */}
              <div className="col-xl-6 col-lg-6 col-md-12">
                <figure className="ps-block--form-box">
                  <figcaption>General</figcaption>
                  <div className="ps-block__content">
                    {[
                      { label: 'Product Name', name: 'name' },
                      { label: 'Reference', name: 'reference' },
                      { label: 'Regular Price', name: 'regularPrice' },
                      { label: 'Sale Price', name: 'salePrice' },
                      { label: 'Sale Quantity', name: 'saleQuantity' },
                      { label: 'Sold Items', name: 'soldItems' },
                      { label: 'stock', name: 'stock' },
                      { label: 'SKU', name: 'sku' },
                      // { label: 'Tags (comma-separated)', name: 'tags' },
                    ].map(({ label, name }) => (
                      <div className="form-group" key={name}>
                        <label>{label} *</label>
                        <input
                          className="form-control"
                          type="text"
                          name={name}
                          value={formData[name]}
                          onChange={handleChange}
                        />
                      </div>
                    ))}
                    <div className="form-group">
                      <label>Product Summary *</label>
                      <textarea
                        className="form-control"
                        name="summary"
                        rows="3"
                        value={formData.summary}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Product Description *</label>
                      <textarea
                        className="form-control"
                        name="description"
                        rows="6"
                        value={formData.description}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </figure>
              </div>

              {/* Right Column - Media & Meta */}
              <div className="col-xl-6 col-lg-6 col-md-12">
                <figure className="ps-block--form-box">
                  <figcaption>Product Images</figcaption>
                  <div className="ps-block__content">
                    <div className="form-group">
                      <label>Thumbnail</label>
                      <input
                        className="form-control"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'thumbnail')}
                      />
                    </div>
                    <div className="form-group">
                      <label>Gallery (multiple)</label>
                      <input
                        className="form-control"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => handleFileChange(e, 'gallery', true)}
                      />
                    </div>

                    {/* Gallery Preview */}
                    {galleryPreview.length > 0 && (
                      <div className="form-group">
                        <label>Preview:</label>
                        <div className="d-flex flex-wrap gap-2">
                          {galleryPreview.map((src, i) => (
                            <img
                              key={i}
                              src={src}
                              alt={`gallery-${i}`}
                              style={{
                                width: '80px',
                                height: '80px',
                                objectFit: 'cover',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="form-group">
                      <label>Video</label>
                      <input
                        className="form-control"
                        type="file"
                        accept="video/*"
                        onChange={(e) => handleFileChange(e, 'video')}
                      />
                    </div>
                  </div>
                </figure>

                {/* Meta Information */}
                <figure className="ps-block--form-box">
                  <figcaption>Meta</figcaption>
                  <div className="ps-block__content">
                    {/* <div className="form-group">
                      <label>Status</label>
                      <select
                        className="form-control"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                      >
                        <option value="">Select status</option>
                        <option value="1">Status 1</option>
                        <option value="2">Status 2</option>
                        <option value="3">Status 3</option>
                        <option value="4">Status 4</option>
                      </select>
                    </div> */}
                    <div className="form-group">
                      <label>Brand</label>
                      <select
                        className="form-control"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                      >
                        <option value="">Select brand</option>
                        <option value="24">Brand 1</option>
                        <option value="23">Brand 2</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Category</label>
                      <select
                        className="form-control"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                      >
                        <option value="">Select category</option>
                        <option value="6">Category 1</option>
                        <option value="7">Category 2</option>
                      </select>
                    </div>
                  </div>
                </figure>
              </div>
            </div>
          </div>

          {/* Bottom buttons */}
          <div className="ps-form__bottom mt-4">
            <a className="ps-btn ps-btn--black" href="/products">
              Back
            </a>
            <button type="button" className="ps-btn ps-btn--gray">
              Cancel
            </button>
            <button type="submit" className="ps-btn">
              Submit
            </button>
          </div>
        </form>
      </section>
    </ContainerDefault>
  )
}

export default CreateProductPage
