import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './component/login';
import { Home } from './component/home';
import { EditableText } from './component/editable';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/EditableText" element={<EditableText />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
