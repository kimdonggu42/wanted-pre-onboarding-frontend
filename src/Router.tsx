import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Main from './pages/Main';
import NotFoundError from './pages/NotFoundError';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import TodoList from './pages/TodoList';

export function Router() {
  const isLogin = localStorage.getItem('accessToken');

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={isLogin ? <Navigate to='/todo' /> : <Main />} />
        <Route path='/signup' element={isLogin ? <Navigate to='/todo' /> : <SignUp />} />
        <Route path='/signin' element={isLogin ? <Navigate to='/todo' /> : <SignIn />} />
        <Route path='/todo' element={isLogin ? <TodoList /> : <Navigate to='/signin' />} />
        <Route path='*' element={<NotFoundError />} />
      </Routes>
    </BrowserRouter>
  );
}
