import React from 'react'
import Navbar from '../user-page/user-pages/Navbar'

const UserLayout = ({children}) => {
  return (
    <div>
        <Navbar />
        {children}
    </div>
  )
}

export default UserLayout