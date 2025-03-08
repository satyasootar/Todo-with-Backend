// src/components/Auth.js
import React, { useState } from 'react';
import account from '../appwrite/account';

function Auth({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notify, setNotify] = useState("")

  const signUp = async () => {
    try {
      const response = await account.create('unique()', email, password);
      console.log('User signed up:', response);
      await signIn();
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  const signIn = async () => {
    try {
      const response = await account.createEmailPasswordSession(email, password);
      console.log('User signed in:', response);
      if (onLogin) onLogin();
    } catch (error) {
      setNotify("Please provide valid credentials")
      console.error('Login error:', error);
    }
  };

  const styles = {
    container: {
      maxWidth: '400px',
      margin: '40px auto',
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 0 15px rgba(0,0,0,0.1)',
      textAlign: 'center',
    },
    input: {
      width: '100%',
      padding: '10px',
      margin: '10px 0',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '16px',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    button: {
      width: '48%',
      padding: '10px',
      margin: '10px 0',
      fontSize: '16px',
      color: '#fff',
      backgroundColor: '#6c63ff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <h1>Todo App</h1>
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Your Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      <p style={{ color: "red" }} >{notify}</p>
      <div style={styles.buttonContainer}>
        <button onClick={signIn} style={styles.button}>
          Login
        </button>
        <button onClick={signUp} style={styles.button}>
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Auth;
