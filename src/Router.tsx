import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import NotFoundError from './pages/NotFoundError';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import TodoList from './pages/TodoList';

export function Router() {
  // const isLogin: string | null = localStorage.getItem('accessToken');

  return (
    <BrowserRouter>
      {/* <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/signup' element={isLogin ? <Navigate to='/todo' /> : <Signup />} />
        <Route path='/signin' element={isLogin ? <Navigate to='/todo' /> : <Signin />} />
        <Route path='/todo' element={isLogin ? <TodoList /> : <Navigate to='/signin' />} />
        <Route path='*' element={<NotFoundError />} />
      </Routes> */}

      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/todo' element={<TodoList />} />
        <Route path='*' element={<NotFoundError />} />
      </Routes>
    </BrowserRouter>
  );
}
