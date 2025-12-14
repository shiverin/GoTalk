import React from "react";  
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";  
import LandingPage from "./pages/LandingPage";  
import PostDetailPage from "./pages/PostPage"; // Import the new page  
import "./App.css"; // optional, for global styles  
  
function App() {  
  return (  
    // 1. Wrap your entire app with the Router component  
    <Router>  
      <div className="App">  
        {/* 2. 'Routes' is where you define your different URL endpoints */}  
        <Routes>  
          {/* Endpoint 1: The root URL "/" will render your LandingPage */}  
          <Route path="/" element={<LandingPage />} />  
  
          {/* Endpoint 2: A dynamic URL "/post/:id" will render the PostDetailPage */}  
          {/* The ':' makes ':id' a dynamic parameter. */}  
          <Route path="/post/:id" element={<PostDetailPage />} />  
            
          {/* You can add more routes here as your app grows */}  
          {/* <Route path="/profile" element={<ProfilePage />} /> */}  
          {/* <Route path="/about" element={<AboutPage />} /> */}  
        </Routes>  
      </div>  
    </Router>  
  );  
}  
  
export default App;