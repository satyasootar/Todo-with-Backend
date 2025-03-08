import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Todo from './components/Todo/Todo'

import React from 'react'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Todo />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App