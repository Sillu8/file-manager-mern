import { Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { API } from '../axios';



const SearchBar = ({ setSearchData }) => {


  const [query, setQuery] = useState('');

  useEffect(() => {
    if (query !== '') {
      search();
    }
  }, [query])

  const search = async () => {
    try {
      const result = await API.get(`/file/?q=${query}`)
      setSearchData(result.data.data)
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <TextField
      size='small'
      variant='outlined'
      type='text'
      placeholder="Search"
      onChange={e => setQuery(e.target.value)}
      value={query}
    />
  )
}

export default SearchBar

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
];