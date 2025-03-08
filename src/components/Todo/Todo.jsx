// src/App.js
import React, { useState } from 'react';
import Auth from '../Auth/Auth';
import TodoInput from './TodoInput';

function Todo() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div>
      {isAuthenticated ? (
        <TodoInput />
      ) : (
        <Auth onLogin={() => setIsAuthenticated(true)} />
      )}
    </div>
  );
}

export default Todo;

