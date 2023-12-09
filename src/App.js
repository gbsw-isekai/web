import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import QA from './component/QA';
import './component/blog';
import Questions from './component/Question';

function App() {
  return (
    <BrowserRouter >
      <Routes>
        <Route path='/qa' element={<QA/>}/>
        <Route path='/questions' element={<Questions/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
