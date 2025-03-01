import {createContext,useState,useContext } from 'react'


const GlobalContext = createContext()
const GlobalProvider = ({children}) => {
    const [globalSearchValue, setGlobalSearchValue] = useState("")

  return (
    <GlobalContext.Provider value={{globalSearchValue, setGlobalSearchValue}}>
      {children}
    </GlobalContext.Provider>
    )
}

export default GlobalProvider 
export const useGlobalState = () => useContext(GlobalContext)