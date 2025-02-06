import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AllTasksPage from "./Pages/AllTasksPage.jsx";
import CompletedTasksPage from "./Pages/CompletedTasksPage.jsx";
import UncompletedTasksPage from "./Pages/UncompletedTasksPage.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<AllTasksPage />} />
                <Route exact path="/completedtaskspage" element={<CompletedTasksPage />} />
                <Route exact path="/uncompletedtaskspage" element={<UncompletedTasksPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;