import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ToDoListPage from "./Pages/ToDoListPage.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<ToDoListPage />} /> 
            </Routes>
        </BrowserRouter>
    );
}

export default App;