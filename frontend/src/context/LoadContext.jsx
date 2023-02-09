import { createContext } from 'react'


export const LoadContext = createContext({
  loading: false,
  showLoading: () => { },
  closeLoading: () => { }
})