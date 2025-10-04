import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase'; // Ensure this path is correct

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    // You can replace this with a more sophisticated loading spinner
    return <div>Loading...</div>;
  }

  // If a user is authenticated, render the child component. Otherwise, redirect to the login page.
  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
