import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import AuthProvider from "./providers/AuthProvider"
import { RouterProvider } from "react-router"
import { Toaster } from "react-hot-toast"
import { router } from './routes/Routes'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(


  <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster position='top-right' reverseOrder={false} />
      </AuthProvider>
          <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>

   

)
