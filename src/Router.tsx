import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Main from './pages/Main';
import NotFoundError from './pages/NotFoundError';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import TodoList from './pages/TodoList';

export function Router() {
  const isLogin: string | null = localStorage.getItem('accessToken');

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={isLogin ? <Navigate to='/todo' /> : <Main />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/todo' element={<TodoList />} />
        <Route path='*' element={<NotFoundError />} />
      </Routes>
    </BrowserRouter>
  );
}
