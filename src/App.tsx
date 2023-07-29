import { Routes, Route, Navigate } from 'react-router-dom';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import TodoList from './pages/todo/TodoList';
import GlobalStyle from './style/globalStyle';

function App() {
  const isLogin: string | null = localStorage.getItem('accessToken');

  return (
    <div className='App'>
      <GlobalStyle />
      <Routes>
        <Route path='/' element={isLogin ? <Navigate to='/todo' replace={true} /> : <Signin />} />
        <Route
          path='/signup'
          element={isLogin ? <Navigate to='/todo' replace={true} /> : <Signup />}
        />
        <Route path='/todo' element={isLogin ? <TodoList /> : <Navigate to='/' replace={true} />} />
        <Route path='*' element={<Navigate to='/' replace={true} />} />
      </Routes>
    </div>
  );
}

export default App;
