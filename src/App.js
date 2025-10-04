import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import StoryLevel from "./pages/StoryLevel";
import Login from "./pages/Login";
import AudioChallenge from "./pages/AudioChallenge";
import Dashboard from "./pages/Dashboard";
import { UserProvider } from "./contexts/UserContext";
import ProtectedRoute from "./components/ProtectedRoute"; // Import the ProtectedRoute

function App() {
  return (
    <Router>
      <UserProvider>
        <MainApp />
      </UserProvider>
    </Router>
  );
}

function MainApp() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route 
          path="/quiz" 
          element={
            <ProtectedRoute>
              <Quiz />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/story/:level" 
          element={
            <ProtectedRoute>
              <StoryLevel />
            </ProtectedRoute>
          } 
        />
         <Route 
          path="/audio" 
          element={
            <ProtectedRoute>
              <AudioChallenge />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </>
  );
}

export default App;

