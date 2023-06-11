import { Routes, Route, Navigate } from 'react-router-dom';
import GlobalStyle from './assets/globalStyle';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Todo from './pages/Todo';

function App() {
  const isLogin = true;

  return (
    <div className="App">
      <GlobalStyle />
      <Routes>
        <Route
          path="/"
          element={
            isLogin ? <Todo /> : <Navigate to="/signin" replace={true} />
          }
        />
        <Route
          path="/signin"
          element={isLogin ? <Navigate to="/" replace={true} /> : <Signin />}
        />
        <Route
          path="/signup"
          element={isLogin ? <Navigate to="/" replace={true} /> : <Signup />}
        />
      </Routes>
    </div>
  );
}

export default App;
