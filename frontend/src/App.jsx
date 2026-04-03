import { Route, Routes } from 'react-router-dom';
import './App.css'
import { ShowTasks } from './pages/ShowTasks';
import { Signup } from './pages/Signup';
import { Login } from './pages/Login';
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<ShowTasks />} />
    </Routes>
  );
}

export default App