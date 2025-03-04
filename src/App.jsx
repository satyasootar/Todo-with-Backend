import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Todo from './components/Todo/Todo'
import Login from './components/Auth/Login'
import LogOut from './components/Auth/LogOut'

import React from 'react'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Todo />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Logout' element={<LogOut />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App