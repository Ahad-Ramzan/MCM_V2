'use client'
import React, { useEffect, useState } from 'react'
// import { useRouter } from 'next/router'
import { useRouter, useParams } from 'next/navigation'
import { getcategoriesById, updateCategories } from '@/apis/products'
import ContainerDefault from '@/components/SuperAdmin/layouts/ContainerDefault'
import HeaderDashboard from '@/components/SuperAdmin/shared/headers/HeaderDashboard'
import toast, { Toaster } from 'react-hot-toast'

const EditCategoryPage = () => {
  const router = useRouter()
  const params = useParams()
  console.log(params, 'params')
  const brandId = params.params
  console.log(brandId, 'brandId')

  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [subCategories, setSubCategories] = useState([{ name: '' }])

  const fetchCategory = async () => {
    try {
      const data = await getcategoriesById(brandId)
      // console.log(data, 'category data')
      // toast.success('Order created successfully!')
      setName(data.name)
      setSlug(data.slug)
      setDescription(data.description || '')
      setSubCategories(
        data.sub_categories?.length > 0 ? data.sub_categories : [{ name: '' }]
      )
    } catch (error) {
      // console.error('Failed to fetch category:', error)
    }
  }

  const handleSubCategoryChange = (index, value) => {
    const updated = [...subCategories]
    updated[index].name = value
    setSubCategories(updated)
  }

  const handleAddSubCategory = () => {
    setSubCategories([...subCategories, { name: '' }])
  }

  const handleRemoveSubCategory = (index) => {
    const updated = subCategories.filter((_, i) => i !== index)
    setSubCategories(updated)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const categoryData = {
      name,
      slug,
      description,
      sub_categories: subCategories.filter((sc) => sc.name.trim() !== ''),
    }

    try {
      await updateCategories(brandId, categoryData)
      toast.success('Category Updated successfully!')
      router.push('/admin/categories')
    } catch (error) {
      toast.error('Failed to Update Category.')
      // console.error(error)
    }
  }

  useEffect(() => {
    if (brandId) {
      fetchCategory()
    }
  }, [brandId])

  return (
    <ContainerDefault>
      <HeaderDashboard title="Categorias" description="Lista de Categorias" />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000, // default for all toasts
        }}
      />
      <div className="container">
        <h2>Edit Category</h2>
        <form className="ps-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name*</label>
            <input
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Slug*</label>
            <input
              className="form-control"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              value={description}
              rows="5"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Sub-Categories</label>
            {subCategories.map((subCat, index) => (
              <div key={index} style={{ display: 'flex', gap: '10px' }}>
                <input
                  className="form-control"
                  value={subCat.name}
                  onChange={(e) =>
                    handleSubCategoryChange(index, e.target.value)
                  }
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveSubCategory(index)}
                    className="ps-btn ps-btn--gray"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddSubCategory}
              className="ps-btn ps-btn--primary mt-2"
            >
              + Add Sub-category
            </button>
          </div>
          <div className="ps-form__bottom mt-4">
            <button type="submit" className="ps-btn ps-btn--submit">
              Update
            </button>
          </div>
        </form>
      </div>
    </ContainerDefault>
  )
}

export default EditCategoryPage
