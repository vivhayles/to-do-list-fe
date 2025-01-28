import { useEffect, useState } from "react";
import Footer from "../Components /Footer/index.jsx";

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
        <section className="bg-[#d0d9e1] font-sans ">
            <h1 className='text-[#033c70] text-2xl font-bold p-8'>To-Do List:</h1>
            <ul className="mx-10 p-4 border-5 border-[#FFF8DC] bg-[#FFF8DC]">
                {tasks.map((task) => (
                    <li key={task.id}>
                        <p>Task Name: {task.name}</p>
                        <p>Completed: {task.completed ? "Yes" : "No"}</p>
                    </li>
                ))}
            </ul>
            <Footer />
        </section>
    );
}

export default ToDoListPage;
