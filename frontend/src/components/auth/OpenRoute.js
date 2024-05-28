import React from 'react'
import { Navigate } from "react-router-dom"
import { useSelector } from 'react-redux';
export default function OpenRoute({children}) {
  const { token } = useSelector((state) => state.auth)
  console.log(token);
  if (token === null) {
    return children
  } else {
    return <Navigate to="/dashboard" />
  }
}
