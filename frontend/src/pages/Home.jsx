import React, { useContext } from 'react'
import Header from '../components/Header'
import Main from '../components/Main'
import Spinner from '../components/Spinner'
import { LoadContext } from '../context/LoadContext'

const Home = () => {
  const { loading } = useContext(LoadContext);
  return (
    <>
      {loading && <Spinner />}
      <Header />
      <Main />
    </>
  )
}

export default Home