import React from 'react'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Home from './pages/Home'
import MainNavigation from './components/MainNavigation'

const router = createBrowserRouter([
    {path:"/",element:<MainNavigation/>,children:[
      {path:"/",element:<Home/>}
    ]}
    
])
const App = () => {
  return (
    <>
      <RouterProvider router = {router}></RouterProvider>
    </>
  )
}

export default App
