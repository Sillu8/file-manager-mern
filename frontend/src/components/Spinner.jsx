import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const Spinner = () => {
  return (
    <Box sx={{ display: 'flex', backgroundColor: '#363636', opacity: '0.5', justifyContent: 'center', alignItems: 'center', height: '100vh', position: 'absolute', width: '100%' }}>
      <CircularProgress color='info'/>
    </Box>
  )
}

export default Spinner