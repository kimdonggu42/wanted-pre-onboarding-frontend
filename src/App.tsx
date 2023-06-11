import { Routes, Route, Navigate } from 'react-router-dom';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Todo from './pages/todo/Todo';
import GlobalStyle from './style/globalStyle';
function App() {
  const isLogin = localStorage.getItem('accessToken');

  return (
    <div className="App">
      <GlobalStyle />
      <Routes>
        <Route
          path="/"
          element={
            isLogin ? <Navigate to="/todo" replace={true} /> : <Signin />
          }
        />
        <Route
          path="/signup"
          element={
            isLogin ? <Navigate to="/todo" replace={true} /> : <Signup />
          }
        />
        <Route
          path="/todo"
          element={isLogin ? <Todo /> : <Navigate to="/" replace={true} />}
        />
      </Routes>
    </div>
  );
}

export default App;
