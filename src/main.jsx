import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {AnimePage, ListPage, SearchPage, WatchPage} from './pages/pageIndex.js'

const router = createBrowserRouter([
  {
    path:'/',
    element: <App/>
  },
  {
    path:'/:animeId',
    element: <AnimePage/>
  },
  {
    path:'/:animeId/watch',
    element: <WatchPage/>
  },
  {
    path:'/home/:list',
    element: <ListPage/>
  },
  {
    path:'/search',
    element: <SearchPage/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
