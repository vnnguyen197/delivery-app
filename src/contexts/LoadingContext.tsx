import React, { createContext, useState, useContext } from 'react'

interface IChildren {
  children: React.ReactNode
}

interface IAlertContextType {
  isLoading: boolean
  setLoadingFalse: () => void
  setLoadingTrue: () => void
}

const LoadingContext = createContext<IAlertContextType>({
  isLoading: false,
  setLoadingFalse: () => undefined,
  setLoadingTrue: () => undefined,
})

const LoadingProvider = ({ children }: IChildren) => {
  const [isLoading, setIsLoading] = useState(false)

  const setLoadingTrue = () => {
    setIsLoading(true)
  }
  const setLoadingFalse = () => {
    setTimeout(() => {
      setIsLoading(false)
    }, 300)
  }

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        setLoadingTrue,
        setLoadingFalse,
      }}
    >
      {children}
    </LoadingContext.Provider>
  )
}
const useLoading = () => {
  return useContext(LoadingContext)
}

export { LoadingProvider, useLoading }
