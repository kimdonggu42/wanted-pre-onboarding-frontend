import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Main from './pages/Main';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import TodoList from './pages/todo/TodoList';

export function Router() {
  const isLogin: string | null = localStorage.getItem('accessToken');

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/signup' element={isLogin ? <Navigate to='/todo' /> : <Signup />} />
        <Route path='/signin' element={isLogin ? <Navigate to='/todo' /> : <Signin />} />
        <Route path='/todo' element={isLogin ? <TodoList /> : <Navigate to='/signin' />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  );
}
