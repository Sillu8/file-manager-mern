import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import React, { useState } from 'react'
import { API } from '../axios';
import CloseIcon from '@mui/icons-material/Close';


const SearchBar = ({ setSearchData }) => {


  const [query, setQuery] = useState('');

  const clear = () => {
    try {
      setQuery('');
      setSearchData([]);
    } catch (err) {
      console.log(err);;
    }
  }


  const search = async () => {
    try {
      const result = await API.get(`/file/?q=${query}`)
      setSearchData(result.data.data)
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <>
      <TextField
        size='small'
        variant='outlined'
        type='text'
        placeholder="Search"
        onChange={e => setQuery(e.target.value)}
        value={query}
        InputProps={{

          endAdornment:
            <InputAdornment position="end">
              <IconButton
                aria-label="clear input field"
                onClick={clear}
                edge="end"
              >
                <CloseIcon />
              </IconButton>
            </InputAdornment>

        }}
      />
      <Button variant='contained' size='small' onClick={search} sx={{ marginLeft: '4px' }}>Search</Button>
    </>
  )
}

export default SearchBar
