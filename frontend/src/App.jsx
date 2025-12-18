import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import PostDetailPage from "./pages/PostPage";
import LoginModal from "./components/LoginModal/LoginModal.jsx";
import { AuthProvider } from "./Context/AuthContext.jsx";
import "./App.css";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  const openLogin = () => setShowLogin(true);
  const closeLogin = () => setShowLogin(false);

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          {/* Routes */}
          <Routes>
            <Route
              path="/"
              element={<LandingPage onLoginClick={openLogin} />}
            />
            <Route path="/post/:id" element={<PostDetailPage />} />
          </Routes>

          {/* Login/Signup Modal */}
          <LoginModal open={showLogin} onClose={closeLogin} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
