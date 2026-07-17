import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";   
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 import Home from "./pages/home";
//  import Sidebar from "./pages/sidebar";
import Students from "./pages/students";
import Course from "./pages/course";
import Allocation from "./pages/allocation";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Login page */}
          <Route path="/" element={<Login />} />

          {/* KFC Home page */}
              
          <Route path="/home" element={<Home/>} />
          <Route path="/students" element={<Students />} />
          <Route path="/courses" element={<Course />} />
            <Route path="/allocation" element={<Allocation />} />


        </Routes>
      </BrowserRouter>

      {/* Toast container (global) */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
