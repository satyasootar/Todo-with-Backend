import React, { useEffect, useState } from 'react';
import db from '../appwrite/databases';
import TodoList from './TodoList';

function TodoInput() {
    const [eventHandler, setEventHandler] = useState("")
    const [lists, setLists] = useState([])

    const addTask = () => {
        const payload = {
            todo: eventHandler,
            complete: false
        }
        addTodatabase(payload)
        setEventHandler("")
    }

    const addTodatabase = async (payload) => {
        try {
            const res = await db.lists.create(payload)
            console.log(res)
            datafetch()
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        datafetch()
    }, [])

    const datafetch = async () => {
        const res = await db.lists.list()
        console.log(res.documents)
        setLists(res.documents)
    }

    const deleteTask = async (id) => {
        try {
            const res = await db.lists.delete(id)
            console.log("deleted: ", res);
            datafetch()
        } catch (error) {
            console.error(error)
        }
    }

    const updateComplete = async (id, complete) => {
        try {
            const res = await db.lists.update(id, {
                complete: !complete
            })
            datafetch()
            console.log("update ", res);
        } catch (error) {
            console.error("error: ", error);

        }
    }

    return (
        <div>
            <input
                type='text'
                placeholder="What's on your thought?"
                onChange={(e) => setEventHandler(e.target.value)}
                value={eventHandler}
                onKeyDown={(e) => e.key === 'Enter' && addTask()} 
            />
            <button
                onClick={addTask}
            >
                Add task
            </button>
            <TodoList
                DataList={lists}
                deleteTask={deleteTask}
                updateComplete={updateComplete}
            />
        </div>
    )
}

export default TodoInput;