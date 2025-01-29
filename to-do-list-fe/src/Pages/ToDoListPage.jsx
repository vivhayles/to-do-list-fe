import { useEffect, useState } from "react";
import Footer from "../Components /Footer/index.jsx";

function ToDoListPage() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await fetch('http://localhost:8000/api/tasks');
            const json = await response.json();
            setTasks(json.data);
        };

        fetchTasks();
    }, []);

    return (
        <section className="bg-[#d0d9e1] font-sans w-full h-screen flex flex-col">
            <h1 className="text-[#033c70] text-2xl font-bold p-8">To-Do-List:</h1>
            <ul className="flex-grow mx-10 p-6 bg-[#FFF8DC] overflow-auto">
                {tasks.map((task) => (
                    <li key={task.id} className="flex justify-between items-center p-2 border-b">
                        <p>{task.name}</p>
                        <input type="checkbox" className="w-5 h-5"/>
                    </li>
                ))}
            </ul>
            <Footer/>
        </section>

    );
}

export default ToDoListPage;
