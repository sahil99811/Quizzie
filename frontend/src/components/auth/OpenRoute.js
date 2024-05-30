import React from 'react';
import { Navigate } from 'react-router-dom'; // Importing Navigate component from react-router-dom for redirection
import { useSelector } from 'react-redux'; // Importing useSelector hook to access Redux store state

// Component for open routes
export default function OpenRoute({ children }) {
  const { token } = useSelector((state) => state.auth); // Accessing token from Redux store state

  // Checking if token is null
  if (token === null) {
    return children; // Render children components if token is null (user is not authenticated)
  } else {
    return <Navigate to="/dashboard" />; // Redirect to dashboard if token exists (user is authenticated)
  }
}
