import './App.css';
import { Routes, Route } from '../node_modules/react-router-dom/dist/index';
import PostListPage from './pages/PostListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';
import PostPage from './pages/PostPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<PostListPage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/register" element={<RegisterPage />}></Route>
      <Route path="/write" element={<WritePage />}></Route>
      <Route path="/@username">
        <Route index element={<PostListPage />}></Route>
        <Route path=":postId" element={<PostPage />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
