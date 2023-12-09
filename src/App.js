import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import QA from "./component/QA";
import "./component/blog";
import Questions from "./component/Question";
import BoardEditor from "./component/BoardEditor";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/questions/:id" element={<QA />} />
        <Route path="/qa/editor" element={<BoardEditor />} />
        <Route path="/questions" element={<Questions />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
