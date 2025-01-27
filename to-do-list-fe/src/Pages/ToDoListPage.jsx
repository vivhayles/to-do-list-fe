import { useEffect, useState } from "react";

function ToDoListPage() {
    const [tasks, setTasks] = useState([]); // State to store tasks

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await fetch('http://localhost:8000/api/tasks');
            const json = await response.json();
            setTasks(json.data);
        };

        fetchTasks();
    }, []);

    return (
        <section>
            <h1>To-Do List</h1>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <p>Task Name: {task.name}</p>
                        <p>Completed: {task.completed ? "Yes" : "No"}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default ToDoListPage;
