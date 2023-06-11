import { Routes, Route } from 'react-router-dom';
import GlobalStyle from './assets/globalStyle';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Todo from './pages/Todo';

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </div>
  );
}

export default App;
