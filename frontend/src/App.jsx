import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import PostPage from "./pages/PostPage";
import LoginModal from "./components/LoginModal/LoginModal.jsx";
import { AuthProvider } from "./Context/AuthContext.jsx";
import UserProfilePage from "./pages/UserProfilePage.jsx";
import CreatePostPage from "./pages/CreatePostPage.jsx";
import CommunityListPage from "./pages/CommunityListPage.jsx";
import CommunityPage from "./pages/CommunityPage.jsx";

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
            <Route path="/posts/:id" element={<PostPage onLoginClick={openLogin}/>} 
            />
            <Route path="/users/:id" element={<UserProfilePage onLoginClick={openLogin}/>} 
            />

            <Route path="/c/:communityId/create" element={<CreatePostPage onLoginClick={openLogin} />} />

            <Route path="/create" element={<CreatePostPage onLoginClick={openLogin} />} />

            {/* Communities */}
            <Route path="/communities" element={<CommunityListPage onLoginClick={openLogin}  />} />
            <Route path="/communities/:id" element={<CommunityPage onLoginClick={openLogin} />} />
          </Routes>

          {/* Login/Signup Modal */}
          <LoginModal open={showLogin} onClose={closeLogin} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
