'use client'
import React, { useState } from 'react'
import ContainerDefault from '@/components/SuperAdmin/layouts/ContainerDefault'
import HeaderDashboard from '@/components/SuperAdmin/shared/headers/HeaderDashboard'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'

// Initial state
const initialFormState = {
  email: '',
  password: '',
  full_name: '',
  role: 'admin',
  address: '',
  bio: '',
  display_name: '',
  contact_number: '',
}

const CreateUserPage = () => {
  const [formData, setFormData] = useState(initialFormState)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        'http://localhost:8000/api/user/create/',
        formData
      )
      toast.success('User created successfully!')
      setFormData(initialFormState)
    } catch (error) {
      console.error(error)
      toast.error('Failed to create user')
    }
  }

  return (
    <ContainerDefault title="Create new user">
      <HeaderDashboard
        title="Create User"
        description="Create a new user account"
      />
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />

      <section className="ps-new-item">
        <form className="ps-form" onSubmit={handleSubmit}>
          <div className="ps-form__content">
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-12">
                <figure className="ps-block--form-box">
                  <figcaption>User Information</figcaption>
                  <div className="ps-block__content">
                    {[
                      { label: 'Email', name: 'email' },
                      { label: 'Password', name: 'password' },
                      { label: 'Full Name', name: 'full_name' },
                      { label: 'Role', name: 'role' },
                      { label: 'Address', name: 'address' },
                      { label: 'Bio', name: 'bio' },
                      { label: 'Display Name', name: 'display_name' },
                      { label: 'Contact Number', name: 'contact_number' },
                    ].map(({ label, name }) => (
                      <div className="form-group" key={name}>
                        <label>{label} *</label>
                        <input
                          className="form-control"
                          type="text"
                          name={name}
                          value={formData[name]}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    ))}
                  </div>
                </figure>
              </div>
            </div>
          </div>

          <div className="ps-form__bottom mt-4">
            <a className="ps-btn ps-btn--black" href="/users">
              Back
            </a>
            <button
              type="reset"
              className="ps-btn ps-btn--gray"
              onClick={() => setFormData(initialFormState)}
            >
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

export default CreateUserPage
