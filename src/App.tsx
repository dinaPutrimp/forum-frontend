import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import Home from "./features/home/Home";
import ThreadDetail from "./features/threads/ThreadDetail";
import Threads from "./features/threads/Threads";
import Notification from "./features/notifications/Notification";
import Profile from "./features/profile/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastProvider } from "./contexts/ToastContext";

const App = () => {
  return (
    <ToastProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Home />}>
                <Route index element={<Threads />} />
                <Route path="threads/:id" element={<ThreadDetail />} />
                <Route path="/notifications" element={<Notification />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ToastProvider>
  );
};

export default App;
