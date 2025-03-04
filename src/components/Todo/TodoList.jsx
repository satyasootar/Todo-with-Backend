import db from '../appwrite/databases';

function TodoList({ DataList, deleteTask, updateComplete }) {

    

    return (
        <>
            {Array.isArray(DataList) && DataList.length > 0 ? (
                DataList.map((ele) => (
                    <div key={ele.$id}>
                        <div>{ele.complete ? <s>{ele.todo}</s> : ele.todo}</div>
                        <button onClick={() => updateComplete(ele.$id, ele.complete)} >completed</button>
                        <button onClick={() => deleteTask(ele.$id)} >Delete</button>
                    </div>
                ))
            ) : (
                <p>No tasks available.</p>
            )}
        </>
    )
}

export default TodoList;