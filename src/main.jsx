import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import {Home, Blog, ContactUs, CategoryLayout, Categories, Category1} from "./components"
import './index.css';

const router = createBrowserRouter(
  createRoutesFromElements(

    <Route path='/' element={<App />}>
    <Route path='' element={<Home/>} />
    <Route path='blogs' element={<Blog/>} />
    <Route path='contact-us' element={<ContactUs/>} />
    <Route path='categories' element={<CategoryLayout/>}>
      <Route index element={<Categories/>}/>
      <Route path='category1' element={<Category1/>}/>
    </Route>
  </Route>
  
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
