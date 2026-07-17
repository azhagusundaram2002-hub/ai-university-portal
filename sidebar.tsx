import "./Sidebar.css";

const Sidebar = () => {
  return (
    <>
      {/* Toggle checkbox */}
      <input type="checkbox" id="sidebar-toggle" />

      {/* Hamburger */}
      <label htmlFor="sidebar-toggle" className="hamburger">
        ☰
      </label>

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>KFC</h2>
          <img
            src="https://tse3.mm.bing.net/th/id/OIP.sMHZYYVk7T2jQ4qhpBoKeAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
            alt="logo"
            className="logo"
          />
          <label htmlFor="sidebar-toggle" className="close-btn">
            ✕
          </label>
        </div>

        <ul className="menu">
          <li className="active">Home</li>
          <li>Features</li>
          <li>About</li>
          <li>Product</li>
          <li>Contact</li>
        </ul>
      </aside>

      {/* Overlay */}
      <label htmlFor="sidebar-toggle" className="overlay"></label>
    </>
  );
};

export default Sidebar;
