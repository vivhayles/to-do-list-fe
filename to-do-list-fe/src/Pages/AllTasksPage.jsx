import { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import Button from "../Components/Button/index.jsx";
import Navbar from "../Components/Navbar/index.jsx";

function AllTasksPage() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const fetchTasks = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/tasks");
            const json = await response.json();
            setTasks(json.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };
    useEffect(() => {
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
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(newTaskObj),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            await fetchTasks();
            setNewTask("");
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const handleCompletedTask = async (taskId) => {
        try {
            await fetch(`http://localhost:8000/api/tasks/${taskId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({ completed: true }),
            });
            console.log("Updating task with ID:", taskId);
            setTasks(tasks.map(task =>
                task.id === taskId ? { ...task, completed: true } : task
            ));
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    return (
        <section className="bg-[#d0d9e1] font-sans w-full h-screen flex flex-col">
            <Navbar />
            <h1 className="text-[#033c70] text-2xl font-bold p-8">To-Do List:</h1>

            <div className="flex-grow mx-10 p-6 bg-[#FFF8DC] overflow-auto flex flex-col">
                <form className="flex mt-4 gap-x-2" onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor="taskInput" className="sr-only">
                        Add Task
                    </label>
                    <input
                        className="bg-white border p-2 flex-1"
                        id="taskInput"
                        type="text"
                        value={newTask}
                        onChange={handleInputChange}
                        placeholder="Let's Get Stuff Done!"
                    />
                    <Button className='bg-[#5ed36c]' onClick={handleAddTask} text='Add Task'/>
                </form>

                <ul className="flex-grow">
                    {tasks.map((task) => (
                        <li key={task.id} className="flex justify-between items-center p-2 border-b">
                            <label htmlFor={`taskCheckbox-${task.id}`} className="flex items-center gap-2">
                                <span>{task.name}</span>
                            </label>
                            <input
                                id={`taskCheckbox-${task.id}`}
                                type="checkbox"
                                className="w-5 h-5 ml-auto"
                                onChange={() => handleCompletedTask(task.id)}
                                checked={task.completed}
                                disabled={task.completed}
                            />
                        </li>
                    ))}
                </ul>
            </div>
            <Footer/>
        </section>
    );
}

export default AllTasksPage;
