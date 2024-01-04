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
import "@radix-ui/themes/styles.css";
import Logout from "./pages/Logout";
import Portfolio from "./pages/portfolio";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/questions/editor" element={<BoardEditor type="1" />} />
        <Route path="/questions/:questionId" element={<QA />} />
        <Route
          path="/questions/:questionId/editor"
          element={<BoardEditor type="2" />}
        />
        <Route
          path="/questions/:questionId/answers/editor"
          element={<BoardEditor type="3" />}
        />
        <Route
          path="/questions/:questionId/answers/:answerId/editor"
          element={<BoardEditor type="4" />}
        />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/logout" element={<Logout />} />
        <Route path="/auth/join" element={<SignUp />} />
        <Route path="/companies" element={<CompanyList />} />
        <Route
          path="/companies/:companiesId"
          element={<CompanyDetail />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
