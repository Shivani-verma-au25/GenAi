import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./features/chats/pages/Dashboard";
import Register from "./features/auth/pages/Register";
import Login from "./features/auth/pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="'/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
