import { useEffect, useState } from "react";
import Footer from "../Components /Footer";

function ToDoListPage() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/tasks");
                const json = await response.json();
                setTasks(json.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, []);

    const handleInputChange = (event) => {
        setNewTask(event.target.value);
    };

    const handleAddTask = async () => {
        if (newTask.trim() === "") return;

        const newTaskObj = {
            name: newTask,
            completed: false,
        };

        try {
            const response = await fetch("http://localhost:8000/api/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newTaskObj),
            });

            const result = await response.json();

            setTasks([...tasks, result.data]);
            setNewTask("");
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    return (
        <section className="bg-[#d0d9e1] font-sans w-full h-screen flex flex-col">
            <h1 className="text-[#033c70] text-2xl font-bold p-8">To-Do List:</h1>

            <div className="flex-grow mx-10 p-6 bg-[#FFF8DC] overflow-auto flex flex-col">
                <form className="flex mt-4 gap-x-2" onSubmit={(e) => e.preventDefault()}>
                    <input
                        className="bg-white border p-2 flex-1"
                        type="text"
                        value={newTask}
                        onChange={handleInputChange}
                        placeholder="Let's Get Stuff Done!"
                    />
                    <button
                        type="button"
                        className="px-4 py-2 bg-[#5ed36c] rounded-md"
                        onClick={handleAddTask}
                    >
                        Add Task
                    </button>
                </form>

                <ul className="flex-grow">
                    {tasks.map((task) => (
                        <li key={task.id} className="flex justify-between items-center p-2 border-b">
                            <p>{task.name}</p>
                            <input type="checkbox" className="w-5 h-5" />
                        </li>
                    ))}
                </ul>
            </div>
            <Footer />
        </section>
    );
}

export default ToDoListPage;
