import React, { useEffect, useState } from 'react'
import { createCategory } from '@/apis/products' // Make sure this is correct
import toast, { Toaster } from 'react-hot-toast'

const FormCreateCategory = () => {
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [subCategories, setSubCategories] = useState([{ name: '' }])

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

    console.log('categoryData', categoryData)

    try {
      await createCategory(categoryData)
      // alert('Category created successfully!');
      toast.success('Category created successfully!')
      // Reset form
      setName('')
      setSlug('')
      setDescription('')
      setSubCategories([{ name: '' }])
    } catch (error) {
      // alert('Failed to create category!');
      toast.error('Failed to create order.')
      // console.error(error);
    }
  }

  useEffect(() => {
    handleSubmit()
  }, [])

  return (
    <form className="ps-form ps-form--new" onSubmit={handleSubmit}>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000, // default for all toasts
        }}
      />
      <div className="ps-form__content">
        <div className="form-group">
          <label>
            Name<sup>*</sup>
          </label>
          <input
            className="form-control"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter category name"
          />
        </div>
        <div className="form-group">
          <label>
            Slug<sup>*</sup>
          </label>
          <input
            className="form-control"
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="Enter category slug"
          />
        </div>
        <div className="form-group">
          <label>Descrição</label>
          <textarea
            className="form-control"
            rows="6"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descrição da Categoria"
          ></textarea>
        </div>

        <div className="form-group">
          <label>Sub-Categories</label>
          {subCategories.map((subCat, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                gap: '10px',
                marginBottom: '10px',
                alignItems: 'center',
              }}
            >
              <input
                className="form-control"
                type="text"
                placeholder={`Sub-category ${index + 1}`}
                value={subCat.name}
                onChange={(e) => handleSubCategoryChange(index, e.target.value)}
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
            className="ps-btn ps-btn--primary"
          >
            + Add Sub-category
          </button>
        </div>
      </div>

      <div className="ps-form__bottom">
        <button type="reset" className="ps-btn ps-btn--gray">
          Clean
        </button>
        <button type="submit" className="ps-btn ps-btn--submit">
          Add
        </button>
      </div>
    </form>
  )
}

export default FormCreateCategory
