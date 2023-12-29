import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import QA from "./pages/QA";
import Questions from "./pages/Question";
import BoardEditor from "./pages/BoardEditor";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Main from "./pages/Main";
import CompanyList from "./pages/Company/list";
import CompanyDetail from "./pages/Company/detail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>}/>
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

        <Route path="/companies" element={<CompanyList/>}/>
        <Route path="/companies/:companiesId" element={<CompanyDetail/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
