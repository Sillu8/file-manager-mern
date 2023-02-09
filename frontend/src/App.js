import React from "react";
import AppRouter from './AppRouter';
import Spinner from './components/Spinner';
import LoadingProvider from './context/providers/LoadingProvider';

function App() {
  return (
    <LoadingProvider>
      <AppRouter />
    </LoadingProvider>
  )
}

export default App;
