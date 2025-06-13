'use client'
import React, { useEffect, useState } from 'react'
import debounce from 'lodash.debounce'
import ContainerDefault from '@/components/SuperAdmin/layouts/ContainerDefault'
import Pagination from '@/components/SuperAdmin/elements/basic/Pagination'
import TableProjectItems from '@/components/SuperAdmin/shared/tables/TableProjectItems'
import { Select, Modal } from 'antd'
import Link from 'next/link'
import HeaderDashboard from '@/components/SuperAdmin/shared/headers/HeaderDashboard'
import {
  deleteProduct,
  getAllProducts,
  getBrandAllData,
  getCategoriesAllData,
  createProducts,
} from '@/apis/products'
import toast, { Toaster } from 'react-hot-toast'
import { FiUpload, FiX, FiImage, FiVideo } from 'react-icons/fi'
import CreateProductPage from './create-product/page'

const { Option } = Select

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
  video: null,
  sku: '',
  brand: '',
  category: '',
}

const ProductPage = () => {
  const [productsData, setProductsData] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  })
  const [selectedBrand, setSelectedBrand] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [categories, setCategories] = useState([])
  const [brand, setBrandsData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [formData, setFormData] = useState(initialFormState)
  const [thumbnailPreview, setThumbnailPreview] = useState(null)
  const [galleryPreview, setGalleryPreview] = useState([])
  const [videoPreview, setVideoPreview] = useState(null)
  const [activeTab, setActiveTab] = useState('general')

  const fetchData = async (
    page = 1,
    search = '',
    brand = '',
    category = '',
    status = ''
  ) => {
    try {
      const response = await getAllProducts(
        page,
        search,
        brand,
        category,
        status
      )
      setProductsData(response)
      setCurrentPage(page)
    } catch (error) {
      toast.error('Failed to fetch products')
    }
  }

  const handleDeleteProduct = async (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id)
        toast.success('Product Deleted successfully!')
        await fetchData(currentPage, searchTerm)
      } catch (error) {
        toast.error('Failed to delete product')
      }
    }
  }

  const handlePageChange = (page) => {
    fetchData(page, searchTerm)
  }

  useEffect(() => {
    const debouncedSearch = debounce(() => {
      fetchData(1, searchTerm)
    }, 500)

    debouncedSearch()

    return () => debouncedSearch.cancel()
  }, [searchTerm])

  // Initial Load
  useEffect(() => {
    fetchData()
  }, [])

  const fetchBrandsData = async () => {
    try {
      const response = await getBrandAllData()
      setBrandsData(response)
    } catch (error) {
      throw new Error('failed to fetch the data')
    }
  }

  const fetchAllCategories = async () => {
    try {
      const response = await getCategoriesAllData()
      setCategories(response)
    } catch (error) {
      throw new Error('failed to fetch data')
    }
  }

  useEffect(() => {
    fetchAllCategories()
    fetchBrandsData()
  }, [])

  const totalPages = Math.ceil(productsData.count / 10)

  // Modal and Form Handlers
  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    setFormData(initialFormState)
    setThumbnailPreview(null)
    setGalleryPreview([])
    setVideoPreview(null)
    setActiveTab('general')
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    setFormData((prev) => ({ ...prev, thumbnail: file }))

    // Create preview
    const reader = new FileReader()
    reader.onload = () => {
      setThumbnailPreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleGalleryChange = (e) => {
    const files = e.target.files
    if (!files.length) return

    // Limit to 4 images
    const selectedFiles = Array.from(files).slice(0, 4 - galleryPreview.length)
    if (selectedFiles.length === 0) {
      toast.error('You can upload maximum 4 images')
      return
    }

    setFormData((prev) => ({
      ...prev,
      gallery: [...prev.gallery, ...selectedFiles],
    }))

    // Create previews
    const newPreviews = []
    selectedFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onload = () => {
        newPreviews.push(reader.result)
        if (newPreviews.length === selectedFiles.length) {
          setGalleryPreview((prev) => [...prev, ...newPreviews])
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const removeGalleryImage = (index) => {
    const newGallery = [...formData.gallery]
    const newPreviews = [...galleryPreview]

    newGallery.splice(index, 1)
    newPreviews.splice(index, 1)

    setFormData((prev) => ({ ...prev, gallery: newGallery }))
    setGalleryPreview(newPreviews)
  }

  const handleVideoChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    setFormData((prev) => ({ ...prev, video: file }))

    // Create preview
    const reader = new FileReader()
    reader.onload = () => {
      setVideoPreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

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
    productData.append('brand', parseInt(formData.brand))
    productData.append('category', parseInt(formData.category))

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

    try {
      const response = await createProducts(productData)
      toast.success('Product created successfully!')
      handleCancel()
      fetchData(currentPage, searchTerm) // Refresh the product list
    } catch (error) {
      toast.error('Failed to create product.')
    }
  }

  const handleProductCreated = async () => {
    setIsModalVisible(false)
    await fetchData(currentPage, searchTerm)
    await fetchData()
  }

  return (
    <ContainerDefault title="Products">
      <HeaderDashboard title="Produtos" description="Lista de Protudos " />
      <Toaster position="top-center" toastOptions={{ duration: 5000 }} />
      <section className="ps-items-listing">
        <div className="ps-section__actions">
          <button className="ps-btn" onClick={showModal}>
            <i className="icon icon-plus mr-2" />
            NOVO PRODUTO
          </button>
        </div>
        <div className="ps-section__header">
          <div className="ps-section__filter">
            <form className="ps-form--filter">
              <div className="ps-form__left">
                <div className="form-group">
                  <Select
                    placeholder="Selecionar Categoria"
                    className="ps-ant-dropdown"
                    value={selectedCategory}
                    onChange={(value) => {
                      setSelectedCategory(value)
                      fetchData(1, searchTerm, selectedBrand, value)
                    }}
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <Option key={cat.id} value={cat.id}>
                        {cat.name}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div className="form-group">
                  <Select
                    placeholder="Product Type"
                    className="ps-ant-dropdown"
                    value={selectedBrand}
                    onChange={(value) => {
                      setSelectedBrand(value)
                      fetchData(1, searchTerm, value, selectedCategory)
                    }}
                  >
                    <option value="">Select Brand</option>
                    {brand.map((b) => (
                      <Option key={b.id} value={b.id}>
                        {b.brand_name}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div className="form-group">
                  <Select
                    placeholder="Estado"
                    className="ps-ant-dropdown"
                    value={selectedStatus}
                    onChange={(value) => {
                      setSelectedStatus(value)
                      fetchData(
                        1,
                        searchTerm,
                        selectedBrand,
                        selectedCategory,
                        value
                      )
                    }}
                  >
                    <Option value="">All</Option>
                    <Option value="active">Active</Option>
                    <Option value="inactive">Inactive</Option>
                  </Select>
                </div>
              </div>
              <div className="ps-form__right">
                <button type="button" className="ps-btn ps-btn--gray">
                  <i className="icon icon-funnel mr-2"></i>
                  Filtros
                </button>
              </div>
            </form>
          </div>

          <div className="ps-section__search">
            <div className="ps-form--search-simple">
              <input
                className="form-control"
                type="text"
                placeholder="Search product"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="button">
                <i className="icon icon-magnifier"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="ps-section__content">
          {productsData.results.length > 0 ? (
            <TableProjectItems
              productsData={productsData.results}
              onDelete={handleDeleteProduct}
              onUpdate={handleProductCreated}
            />
          ) : (
            <p style={{ padding: '1rem' }}>No products found.</p>
          )}
        </div>

        <div className="ps-section__footer">
          <p>
            Mostrar {productsData.results.length} de {productsData.count}{' '}
            Produtos.
          </p>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </section>

      {/* Modal for creating new product */}
      <Modal
        title="Create New Product"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
        style={{ top: 20 }}
        onSuccess={handleProductCreated}
      >
        <CreateProductPage onSuccess={handleProductCreated} />
      </Modal>
      <style jsx>{`
        .ps-form__tabs {
          border-bottom: 1px solid #dee2e6;
        }
        .nav-tabs {
          display: flex;
          flex-wrap: wrap;
          padding-left: 0;
          margin-bottom: 0;
          list-style: none;
        }
        .nav-link {
          padding: 0.5rem 1rem;
          border: 1px solid transparent;
          border-top-left-radius: 0.25rem;
          border-top-right-radius: 0.25rem;
          color: #495057;
          cursor: pointer;
          margin-bottom: -1px;
          background: none;
          border: none;
          font-weight: 500;
        }
        .nav-link:hover {
          border-color: #e9ecef #e9ecef #dee2e6;
          color: #0056b3;
        }
        .nav-link.active {
          color: #0056b3;
          background-color: #fff;
          border-color: #dee2e6 #dee2e6 #fff;
          border-bottom: 2px solid #0056b3;
        }
        .file-upload-wrapper {
          position: relative;
          margin-bottom: 1rem;
        }
        .file-upload-input {
          opacity: 0;
          position: absolute;
          width: 1px;
          height: 1px;
        }
        .file-upload-label {
          display: block;
          padding: 1.5rem;
          border: 2px dashed #ddd;
          border-radius: 5px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s;
        }
        .file-upload-label:hover {
          border-color: #3498db;
          background-color: #f8f9fa;
        }
        .file-upload-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #6c757d;
        }
        .upload-icon {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }
        .preview-container {
          border: 1px solid #eee;
          padding: 10px;
          border-radius: 5px;
          background: #f9f9f9;
        }
        .image-preview img {
          max-width: 100%;
          max-height: 200px;
          display: block;
        }
        .gallery-preview {
          border: 1px solid #eee;
          padding: 10px;
          border-radius: 5px;
          background: #f9f9f9;
        }
      `}</style>
    </ContainerDefault>
  )
}

export default ProductPage
