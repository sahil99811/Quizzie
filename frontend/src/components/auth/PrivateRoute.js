import React from 'react';
import { useSelector } from 'react-redux'; // Importing useSelector hook to access Redux store state
import { Navigate } from 'react-router-dom'; // Importing Navigate component from react-router-dom for redirection

// Component for private routes
export default function PrivateRoute({ children }) {
  const { token } = useSelector((state) => state.auth); // Accessing token from Redux store state

  // Checking if token exists
  if (token) {
    return children; // Render children components if token exists
  } else {
    return <Navigate to="/" />; // Redirect to home page if token doesn't exist
  }
}
