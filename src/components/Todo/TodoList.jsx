// src/components/TodoList.jsx
import React from 'react';

function TodoList({ DataList, deleteTask, updateComplete }) {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      marginTop: '20px',
    },
    item: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#fff',
      padding: '10px 15px',
      borderRadius: '4px',
      border: '1px solid #ddd',
    },
    text: {
      flexGrow: 1,
      fontSize: '16px',
      color: '#333',
    },
    button: {
      padding: '5px 10px',
      fontSize: '14px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      marginLeft: '10px',
    },
    completeButton: {
      backgroundColor: '#28a745',
      color: 'white',
    },
    deleteButton: {
      backgroundColor: '#dc3545',
      color: 'white',
    },
    noTasks: {
      textAlign: 'center',
      color: '#666',
    },
  };

  return (
    <div style={styles.container}>
      {Array.isArray(DataList) && DataList.length > 0 ? (
        DataList.map((ele) => (
          <div key={ele.$id} style={styles.item}>
            <div style={styles.text}>
              {ele.complete ? <s>{ele.todo}</s> : ele.todo}
            </div>
            <button
              onClick={() => updateComplete(ele.$id, ele.complete)}
              style={{ ...styles.button, ...styles.completeButton }}
            >
              {ele.complete ? 'Undo' : 'Complete'}
            </button>
            <button
              onClick={() => deleteTask(ele.$id)}
              style={{ ...styles.button, ...styles.deleteButton }}
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <p style={styles.noTasks}>No tasks available.</p>
      )}
    </div>
  );
}

export default TodoList;
