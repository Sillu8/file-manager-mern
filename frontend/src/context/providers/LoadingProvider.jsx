import React, { useState } from 'react'
import { LoadContext } from '../LoadContext';

const LoadingProvider = ({ children }) => {

  const [loading, setLoading] = useState(false);

  const showLoading = () => setLoading(true);
  const hideLoading = () => setLoading(false);

  const states = {
    loading,
    showLoading,
    hideLoading
  }

  return (
    <LoadContext.Provider value={states} >
      {children}
    </LoadContext.Provider>
  )
}

export default LoadingProvider