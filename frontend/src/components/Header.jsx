import React from 'react'
import { AppBar, Toolbar, Typography } from '@mui/material'


const Header = () => {



  return (
    <>
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



