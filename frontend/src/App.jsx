import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import PostDetailPage from "./pages/PostPage";
import LoginModal from "./components/LoginModal/LoginModal.jsx";
import SignupForm from "./components/SignupForm/SignupForm.jsx";
import LoginForm from "./components/LoginForm/LoginForm.jsx";
import { AuthProvider }  from "./Context/AuthContext.jsx";
import "./App.css";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [mode, setMode] = useState("login"); // "login" or "signup"

  const openLogin = () => setShowLogin(true);
  const closeLogin = () => setShowLogin(false);

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route
              path="/"
              element={<LandingPage onLoginClick={openLogin} />}
            />
            <Route path="/post/:id" element={<PostDetailPage />} />
          </Routes>

          {/* Modal */}
          <LoginModal
            open={showLogin}
            onClose={closeLogin}
            title={mode === "login" ? "Log In" : "Sign Up"}
          >
            {mode === "login" ? (
              <LoginForm
                onClose={closeLogin}
                switchMode={() => setMode("signup")}
              />
            ) : (
              <SignupForm
                onClose={closeLogin}
                switchMode={() => setMode("login")}
              />
            )}
          </LoginModal>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
