'use client'
import React, { useEffect, useState } from 'react'
import ContainerDefault from '@/components/SuperAdmin/layouts/ContainerDefault'
import HeaderDashboard from '@/components/SuperAdmin/shared/headers/HeaderDashboard'
import axios from 'axios'
import TableBannerPage from '@/components/SuperAdmin/shared/tables/TableBannerPage'
import Pagination from '@/components/SuperAdmin/elements/basic/Pagination'
import FormSearchSimple from '@/components/SuperAdmin/shared/forms/FormSearchSimple'
import BannerUploadPage from '@/components/SuperAdmin/banners/CreateBannerModal'
import { Modal } from 'antd'
import { deleteBanner, getbanner } from '@/apis/products'
import toast, { Toaster } from 'react-hot-toast'

const BannerPage = () => {
  const [banners, setBanners] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)

  useEffect(() => {
    fetchBanners()
  }, [])

  const fetchBanners = async () => {
    try {
      const response = await getbanner()
      setBanners(response.results)
    } catch (error) {
      console.error('Error fetching banners:', error)
    }
  }

  // const handleDeleteBanner = async (bannerId) => {
  //   try {
  //     await axios.delete(
  //       `https://backendmcm.estelatechnologies.com/api/orders/banners/${bannerId}/`
  //     )
  //     await fetchBanners()
  //   } catch (error) {
  //     console.error('Error deleting banner:', error)
  //   }
  // }

  const handleDeleteBanner = async (bannerId) => {
    try {
      await deleteBanner(bannerId)
      toast.success('Banner deleted successfully!')
      await fetchBanners() // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting banner:', error)
      message.error(error.message || 'Failed to delete banner')
    }
  }

  const handleUpdateBanner = async (updatedBanner) => {
    try {
      await axios.put(
        `https://backendmcm.estelatechnologies.com/api/orders/banners/${updatedBanner.id}/`,
        updatedBanner
      )
      await fetchBanners()
    } catch (error) {
      console.error('Error updating banner:', error)
    }
  }

  return (
    <ContainerDefault title="Banner Management">
      <HeaderDashboard
        title="Banner Management"
        description="Manage your banners"
      />
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />

      <section className="ps-items-listing">
        <div className="ps-section__actions">
          <button className="ps-btn" onClick={() => setIsModalVisible(true)}>
            <i className="icon icon-plus mr-2" />
            Add Banner
          </button>
        </div>

        <div className="ps-section__content">
          <TableBannerPage
            banners={banners}
            onDelete={handleDeleteBanner}
            onUpdate={handleUpdateBanner}
          />
        </div>
      </section>

      <Modal
        title="Create New Brand"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <BannerUploadPage />
      </Modal>
    </ContainerDefault>
  )
}

export default BannerPage
