import {
  GraduationCap,
  Users,
  BookOpen,
  LayoutDashboard,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {

  const role = localStorage.getItem("role");

  const teacherMenus = [
    {
      name: "Dashboard",
      path: "/home",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Students",
      path: "/students",
      icon: <Users size={20} />,
    },
    {
      name: "Courses",
      path: "/courses",
      icon: <BookOpen size={20} />,
    },
    {
      name: "Allocation",
      path: "/allocation",
      icon: <GraduationCap size={20} />,
    },
  ];

  const studentMenus = [
    {
      name: "Dashboard",
      path: "/home",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Students",
      path: "/students",
      icon: <Users size={20} />,
    },
    {
      name: "Allocation",
      path: "/allocation",
      icon: <GraduationCap size={20} />,
    },
  ];

  const menus = role === "TEACHER" ? teacherMenus : studentMenus;

  return (
    <aside className="sidebar">
      <div className="sidebar-title">
        University Portal
      </div>

      <nav className="sidebar-menu">
        {menus.map((menu) => (
          <NavLink
            key={menu.name}
            to={menu.path}
            className="menu-item"
          >
            {menu.icon}
            <span className="menu-text">
              {menu.name}
            </span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Navbar;