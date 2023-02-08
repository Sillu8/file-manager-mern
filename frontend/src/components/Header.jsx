import React, { useEffect } from 'react'
import { AppBar, Autocomplete, CssBaseline, TextField, Toolbar, Typography } from '@mui/material'
import { API } from '../axios'
import { useState } from 'react'
import SearchBar from './SearchBar'

const Header = () => {



  return (
    <>
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            File Manager
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header



