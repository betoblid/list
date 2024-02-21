import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const route = createBrowserRouter([
  {
    path: "/",
    element: <App />
  }
])

const client = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <RouterProvider router={route} />
    </QueryClientProvider>
  </React.StrictMode>,
)
