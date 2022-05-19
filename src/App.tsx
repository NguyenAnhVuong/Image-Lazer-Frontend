import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Auth from './components/Auth/Auth';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
}

export default App;
