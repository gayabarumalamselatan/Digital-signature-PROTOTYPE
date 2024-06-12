
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Create from "./components/Create";
import Home from "./components/Home";
import DashboardLog from "./components/Login/Dashboard";
import LoginPage from "./components/Login/Login";
import Report from "./components/Report";
import PdfViewer from "./components/Text Editor/PdfViewer";
import View from "./components/View";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardLog />} />
        <Route path="/create" element={<Create />} />
        <Route path="/view" element={<View />} />
        <Route path="/report" element={<Report />} />
        <Route path="/pdfviewer" element={<PdfViewer />} />
        <Route path="/home" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
