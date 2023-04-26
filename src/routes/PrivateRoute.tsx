import React from 'react'
import { Navigate } from 'react-router-dom'
import { LayoutType } from 'layouts'

const PrivateRoute = ({ layout }: { layout: LayoutType }) => {

  // const LayoutTemplate = Layout(layout)
  // if (token) {
  //   return (
  //     <LayoutTemplate>
  //       <Outlet />
  //     </LayoutTemplate>
  //   )
  // }
  return (
    <>
      <Navigate to="/login" replace={true} />
    </>
  )
}
export default PrivateRoute
