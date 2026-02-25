import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Timer from "./pages/Timer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/timer" element={<Timer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;