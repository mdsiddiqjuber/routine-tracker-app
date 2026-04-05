import { Route, Routes } from 'react-router-dom';
import './App.css'
import { ShowTasks } from './pages/ShowTasks';
import { Signup } from './pages/Signup';
import { Login } from './pages/Login';
import { HomePage } from './pages/HomePage';
import { GlobalLoader } from './components/GlobalLoader';
import { Layout } from './components/Layout';

function App() {
  return (
    <>
      <GlobalLoader />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/" element={<Layout />}>
          <Route path="home" element={<ShowTasks />} />
        </Route>
      </Routes>
    </>
  );
}

export default App