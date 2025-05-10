'use client'
import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getBrandById, updateBrand } from '@/apis/products'
import ContainerDefault from '@/components/SuperAdmin/layouts/ContainerDefault'
import HeaderDashboard from '@/components/SuperAdmin/shared/headers/HeaderDashboard'
import toast, { Toaster } from 'react-hot-toast'

const EditBrand = () => {
  const router = useRouter()
  const params = useParams()
  console.log(params, 'params')
  const brandId = params.params
  console.log(brandId, 'brandId')

  const [brandData, setBrandData] = useState({
    brand_name: '',
  })

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const data = await getBrandById(brandId)
        setBrandData(data)
      } catch (error) {
        console.error('Failed to fetch brand:', error)
      }
    }

    if (brandId) {
      fetchBrand()
    }
  }, [brandId])

  const handleInputChange = (e) => {
    setBrandData({ ...brandData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log(brandId, 'brandId and brand data')
    try {
      await updateBrand(brandId, brandData)
      // alert('Brand updated successfully!')
      toast.success('Brand Updated successfully!')
      router.push('/admin/brand') // Redirect back to the brand list
    } catch (error) {
      console.error('Update failed:', error)
      // alert('Failed to update brand.')
      toast.error('Failed to update brand.')
    }
  }

  return (
    <ContainerDefault>
      <HeaderDashboard title="Categorias" description="Lista de Categorias" />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000, // default for all toasts
        }}
      />

      <div className="container p-6">
        <h2 className="text-xl font-bold mb-4">Edit Brand</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label className="block mb-2">Brand Name</label>
            <input
              type="text"
              name="brand_name"
              value={brandData.brand_name}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="ps-btn">
            Update Brand
          </button>
        </form>
      </div>
    </ContainerDefault>
  )
}

export default EditBrand
