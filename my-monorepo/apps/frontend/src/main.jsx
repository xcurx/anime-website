import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {AnimePage, GenrePage, ListPage, SearchPage, WatchPage} from './pages/pageIndex.js'
import { Provider } from 'react-redux'
import store from './store/store.js'

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
  },
  {
    path:'/genre/:genre',
    element: <GenrePage/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
