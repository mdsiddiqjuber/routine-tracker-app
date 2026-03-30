import { Route, Routes } from 'react-router-dom';
import './App.css'
import { ShowTasks } from './pages/ShowTasks';
import { AddTask } from './pages/AddTask';
function App() {
  return (
    <Routes>
      <Route path="/" element={<ShowTasks />} />
      <Route path="/add" element={<AddTask />} />
    </Routes>
  );
}

export default App