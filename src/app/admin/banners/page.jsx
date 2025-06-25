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
  const [banners, setBanners] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  })
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const totalPages = Math.ceil(banners.count / 10)

  const fetchBanners = async (page = 1) => {
    try {
      setIsLoading(true)
      const response = await getbanner(page)
      setBanners(response)
      setCurrentPage(page)
    } catch (error) {
      console.error('Error fetching banners:', error)
      toast.error('Failed to fetch banners')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePageChange = (page) => {
    fetchBanners(page)
  }

  const handleBannersCreated = async () => {
    setIsModalVisible(false)
    await fetchBanners(currentPage) // Refresh the current page
    toast.success('Banner created successfully!')
  }

  const handleDeleteBanner = async (bannerId) => {
    try {
      await deleteBanner(bannerId)
      toast.success('Banner deleted successfully!')
      await fetchBanners(currentPage) // Refresh the current page after deletion
    } catch (error) {
      console.error('Error deleting banner:', error)
      toast.error(error.message || 'Failed to delete banner')
    }
  }

  const handleUpdateBanner = async (updatedBanner) => {
    try {
      await axios.put(
        `https://backendmcm.estelatechnologies.com/api/orders/banners/${updatedBanner.id}/`,
        updatedBanner
      )
      await fetchBanners(currentPage) // Refresh the current page after update
      toast.success('Banner updated successfully!')
    } catch (error) {
      console.error('Error updating banner:', error)
      // toast.error('Failed to update banner')
    }
  }

  useEffect(() => {
    fetchBanners(1) // Initial fetch when component mounts
  }, [])

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
          {isLoading ? (
            <div className="text-center p-5">Loading banners...</div>
          ) : (
            <TableBannerPage
              banners={banners}
              onDelete={handleDeleteBanner}
              onUpdate={handleUpdateBanner}
              onUpdated={() => fetchBanners(currentPage)}
            />
          )}
        </div>

        <div className="ps-section__footer">
          <p>
            Showing {banners.results.length} of {banners.count} banners.
          </p>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </section>

      <Modal
        title="Create New Banner"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <BannerUploadPage onSuccess={handleBannersCreated} />
      </Modal>
    </ContainerDefault>
  )
}

export default BannerPage
