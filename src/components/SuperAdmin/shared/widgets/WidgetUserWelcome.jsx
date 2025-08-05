import { getCurrentUser } from '@/apis/userApi'
import React, { useEffect, useState } from 'react'

const WidgetUserWelcome = () => {
  const [currentUser, setCurrentUser] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  })

  const fetchData = async () => {
    try {
      const response = await getCurrentUser()
      setCurrentUser(response)
    } catch (error) {
      console.error('error occur')
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div className="ps-block--user-wellcome">
      <div className="ps-block__left ">
        <img src="/img/user/admin.jpg" alt="" />
      </div>
      <div className="ps-block__right">
        <p>
          Ola,<a href="#">Senhor Alberto</a>
        </p>
      </div>
      <div className="ps-block__action">
        <a
          href="#"
          onClick={() => {
            localStorage.removeItem('access_token')
            localStorage.removeItem('user_role')
            window.location.href = '/'
          }}
        >
          <i className="icon-exit"></i>
        </a>
      </div>
    </div>
  )
}

export default WidgetUserWelcome
