import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './component/login';
import { Home } from './component/home';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
