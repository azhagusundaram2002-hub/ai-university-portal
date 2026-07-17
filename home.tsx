import Navbar from "../pages/navbar";
import Dashboard from "../pages/dashboard";
import "./Home.css";

import { Bell, Search, UserCircle } from "lucide-react";

const Home = () => {
  return (
    <div className="home">
      {/* Sidebar */}
      <Navbar />

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="topbar">
          <div className="header-left">
            <h1>University Admission System</h1>
            <p>Welcome to the Admission Management Dashboard</p>
          </div>

          <div className="topbar-right">
            <div className="search-box">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search..."
              />
            </div>

            <Bell size={24} className="icon" />

            <div className="profile">
              <UserCircle size={40} />
              <div>
                <h4>Admin</h4>
                <span>Admission Officer</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard */}
        <Dashboard />
      </div>
    </div>
  );
};

export default Home;