// src/components/TodoInput.jsx
import React, { useEffect, useState, useCallback } from 'react';
import db from '../appwrite/databases';
import TodoList from './TodoList';
import account from '../appwrite/account';
import { Permission, Role, Query } from 'appwrite';

function TodoInput() {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    const fetchData = useCallback(async () => {
        if (!currentUser) return;
        try {
            const res = await db.lists.list([
                Query.equal('userId', currentUser.$id),
            ]);
            console.log('Fetched tasks:', res.documents);
            setTasks(res.documents);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }, [currentUser]);

    // Initialize user on mount
    useEffect(() => {
        (async function initialize() {
            try {
                const user = await account.get();
                setCurrentUser(user);
            } catch (error) {
                console.error('No user logged in:', error);
            }
        })();
    }, []);

    // Fetch tasks when currentUser is set
    useEffect(() => {
        if (currentUser) {
            fetchData();
        }
    }, [currentUser, fetchData]);

    const addTask = async () => {
        if (!currentUser) {
            console.error('User not logged in!');
            return;
        }
        if (!task.trim()) return; // Prevent adding empty tasks

        const payload = {
            todo: task,
            complete: false,
            userId: currentUser.$id,
        };

        const permissions = [
            Permission.read(Role.user(currentUser.$id)),
            Permission.update(Role.user(currentUser.$id)),
            Permission.delete(Role.user(currentUser.$id)),
        ];

        try {
            const res = await db.lists.create(payload, permissions);
            console.log('Task added:', res);
            setTask('');
            fetchData();
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const deleteTask = async (id) => {
        try {
            const res = await db.lists.delete(id);
            console.log('Deleted task:', res);
            fetchData();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const updateComplete = async (id, complete) => {
        try {
            const res = await db.lists.update(id, { complete: !complete });
            console.log('Updated task:', res);
            fetchData();
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const deleteSession = async () => {
        try {
            const result = await account.deleteSession('current');
            console.log("Logged out:", result);
            fetchData()
            setCurrentUser(null);
            window.location.reload()
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };


    const styles = {
        container: {
            maxWidth: '600px',
            margin: '40px auto',
            padding: '20px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
        },
        heading: {
            textAlign: 'center',
            marginBottom: '20px',
            color: '#333',
        },
        inputSection: {
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '20px',
        },
        input: {
            flexGrow: 1,
            padding: '10px',
            fontSize: '16px',
            border: '2px solid #ddd',
            borderRadius: '4px',
            outline: 'none',
        },
        addButton: {
            marginLeft: '10px',
            padding: '10px 20px',
            backgroundColor: '#6c63ff',
            color: 'white',
            fontSize: '16px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease',
        },
    };

    return (
        <div style={styles.container}>
            <button onClick={deleteSession} style={{ backgroundColor: "red", border: "none", padding: "5px", cursor: "pointer" }} >Log Out</button>
            <h1 style={styles.heading}>My Todo App</h1>
            <div style={styles.inputSection}>

                <input
                    type="text"
                    placeholder="What's on your mind?"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addTask()}
                    style={styles.input}
                />
                <button onClick={addTask} style={styles.addButton}>
                    Add Task
                </button>
            </div>
            <TodoList
                DataList={tasks}
                deleteTask={deleteTask}
                updateComplete={updateComplete}
            />
        </div>
    );
}

export default TodoInput;
