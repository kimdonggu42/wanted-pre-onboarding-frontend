import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import NotFoundError from './pages/NotFoundError';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import TodoList from './pages/todo/TodoList';

export function Router() {
  return (
    <BrowserRouter>
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
