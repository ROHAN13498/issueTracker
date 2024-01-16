'use client'
import React, { PropsWithChildren } from 'react'
import {QueryClient,QueryClientProvider} from "@tanstack/react-query"
const queryClient = new QueryClient(); 

const Queryclientprovider = ({children}:PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default Queryclientprovider