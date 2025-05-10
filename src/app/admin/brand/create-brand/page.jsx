'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrands } from '@/apis/products'
import toast, { Toaster } from 'react-hot-toast'
import ContainerDefault from '@/components/SuperAdmin/layouts/ContainerDefault'
import HeaderDashboard from '@/components/SuperAdmin/shared/headers/HeaderDashboard'

const CreateBrand = () => {
  const [brandName, setBrandName] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const brandData = {
      id: 0,
      brand_name: brandName,
    }

    try {
      await createBrands(brandData)
      toast.success('Brand created successfully!')
      // alert('Brand created successfully!');
      router.push('/admin/brand') // ✅ navigate on success
    } catch (error) {
      // alert('Failed to create brand');
      toast.error('Failed to create brand.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <ContainerDefault title="Create new Brand">
      <HeaderDashboard
        title="Create Brand"
        description="Martfury Create New Brand"
      />
      <div className="ps-page ps-page--inner">
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000, // default for all toasts
          }}
        />
        <div className="ps-section--custom">
          <div className="container">
            <h2 className="mb-4">Create New Brand</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Brand Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder="Enter brand name"
                  required
                />
              </div>
              <button type="submit" className="ps-btn mt-3" disabled={loading}>
                {loading ? 'Submitting...' : 'Create Brand'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </ContainerDefault>
  )
}

export default CreateBrand
