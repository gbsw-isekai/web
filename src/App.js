import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import QA from "./component/QA";
import "./component/blog";
import Questions from "./component/Question";
import BoardEditor from "./component/BoardEditor";
import Login from "./component/Login";
import SignUp from "./component/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/question/editor" element={<BoardEditor type="1" />} />
        <Route path="/question/:questionId" element={<QA />} />
        <Route
          path="/question/:questionId/editor"
          element={<BoardEditor type="2" />}
        />
        <Route
          path="/question/:questionId/answers/editor"
          element={<BoardEditor type="3" />}
        />
        <Route
          path="/question/:questionId/answers/:answerId/editor"
          element={<BoardEditor type="4" />}
        />
        <Route path="/questions" element={<Questions />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/users/join" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
