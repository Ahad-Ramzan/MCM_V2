'use client'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getProductsById, updateProducts } from '@/apis/products'
import ContainerDefault from '@/components/SuperAdmin/layouts/ContainerDefault'
import HeaderDashboard from '@/components/SuperAdmin/shared/headers/HeaderDashboard'
import toast, { Toaster } from 'react-hot-toast'
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
  video: null,
  sku: '',
  // status: '',
  brand: '',
  // tags: '',
  category: '',
}

const EditProductPage = () => {
  const { id } = useParams()
  console.log(id, 'prodid')
  const router = useRouter()
  const [formData, setFormData] = useState(initialFormState)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductsById(id)
        console.log(data, 'prod data')

        setFormData({
          name: data.product_name || '',
          reference: data.reference || '',
          summary: data.product_summary || '',
          regularPrice: data.regular_price || '',
          salePrice: data.sale_price || '',
          saleQuantity: data.sale_quantity || '',
          soldItems: data.sold_items || '',
          stock: data.stock || '',
          description: data.product_description || '',
          thumbnail: null,
          gallery: [],
          video: null,
          sku: data.SKU || '',
          // status: data.status?.toString() || '',
          brand: data.brand?.toString() || '',
          // tags: data.tags || '',
          category: data.category?.toString() || '',
        })
      } catch (err) {
        toast.error('Failed to fetch product')
        console.error(err)
      }
    }

    fetchProduct()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e, fieldName, isMultiple = false) => {
    const files = e.target.files
    if (!files.length) return
    if (isMultiple) {
      setFormData((prev) => ({ ...prev, [fieldName]: files }))
    } else {
      setFormData((prev) => ({ ...prev, [fieldName]: files[0] }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

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
    productData.append('brand', formData.brand)
    productData.append('category', formData.category)
    // productData.append('tags', formData.tags)

    if (formData.thumbnail) {
      productData.append('product_thumbnail', formData.thumbnail)
    }

    if (formData.gallery.length > 0) {
      Array.from(formData.gallery).forEach((file) => {
        productData.append('product_gallery', file)
      })
    }

    if (formData.video) {
      productData.append('product_video', formData.video)
    }

    try {
      const response = await updateProducts(id, productData)
      toast.success('Product updated successfully!')
      router.push('/admin/products')
    } catch (error) {
      toast.error('Failed to update product.')
      // console.error(error)
    }
  }

  return (
    <ContainerDefault title="Edit Product">
      <HeaderDashboard
        title="Edit Product"
        description="Update product details"
      />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000, // default for all toasts
        }}
      />
      <form
        className="ps-form ps-form--new-product"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="ps-form__content">
          <div className="row">
            {/* Left Side */}
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
                    // { label: 'Tags', name: 'tags' },
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
                    <label>Product Summary</label>
                    <textarea
                      className="form-control"
                      name="summary"
                      rows="3"
                      value={formData.summary}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Product Description</label>
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

            {/* Right Side */}
            <div className="col-xl-6 col-lg-6 col-md-12">
              <figure className="ps-block--form-box">
                <figcaption>Media</figcaption>
                <div className="ps-block__content">
                  <div className="form-group">
                    <label>Thumbnail</label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'thumbnail')}
                    />
                  </div>
                  <div className="form-group">
                    <label>Gallery</label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      multiple
                      onChange={(e) => handleFileChange(e, 'gallery', true)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Video</label>
                    <input
                      type="file"
                      className="form-control"
                      accept="video/*"
                      onChange={(e) => handleFileChange(e, 'video')}
                    />
                  </div>
                </div>
              </figure>

              <figure className="ps-block--form-box">
                <figcaption>Meta</figcaption>
                <div className="ps-block__content">
                  {/* <div className="form-group">
                    <label>Status</label>
                    <select
                      name="status"
                      className="form-control"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="">Select Status</option>
                      <option value="1">Active</option>
                      <option value="2">Inactive</option>
                    </select>
                  </div> */}
                  <div className="form-group">
                    <label>Brand</label>
                    <input
                      type="text"
                      name="brand"
                      className="form-control"
                      value={formData.brand}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <input
                      type="text"
                      name="category"
                      className="form-control"
                      value={formData.category}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </figure>
            </div>
          </div>

          <div className="form-group submit">
            <button type="submit" className="ps-btn ps-btn--fullwidth">
              Update Product
            </button>
          </div>
        </div>
      </form>
    </ContainerDefault>
  )
}

export default EditProductPage
