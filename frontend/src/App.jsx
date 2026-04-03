import { Route, Routes } from 'react-router-dom';
import './App.css'
import { ShowTasks } from './pages/ShowTasks';
import { Signup } from './pages/Signup';
import { Login } from './pages/Login';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App