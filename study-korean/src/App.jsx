import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StudySet } from '../pages/StudySet';
import Home from '../pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/set/:id" element={<StudySet />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
