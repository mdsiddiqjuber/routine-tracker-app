import { Route, Routes } from 'react-router-dom';
import './App.css'
import { ShowTasks } from './pages/ShowTasks';
function App() {
  return (
    <Routes>
      <Route path="/" element={<ShowTasks />} />
    </Routes>
  );
}

export default App