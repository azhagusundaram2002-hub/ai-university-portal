import { useState } from "react";
import { login } from "../services/authservice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"STUDENT" | "TEACHER">("STUDENT");
  const [employeeId, setEmployeeId] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !email) {
      toast.warning("Please fill all fields");
      return;
    }

    if (role === "TEACHER" && !employeeId) {
      toast.warning("Employee ID is required");
      return;
    }

    try {
      setLoading(true);

 const user = await login({
  username,
  email,
  role,
  employeeId: role === "TEACHER" ? employeeId : undefined,
});

// Save role returned by backend
localStorage.setItem("role", user.role);

toast.success("Login Successful 🎉");

navigate("/home");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <div className="auth-left">
          <img
            src="https://img.freepik.com/free-vector/computer-login-concept-illustration_114360-7962.jpg"
            alt="illustration"
            className="auth-illustration"
          />
        </div>

        <div className="auth-right">
          <h2>University Login</h2>

          <form onSubmit={handleSubmit} className="auth-form">

            <select
              value={role}
              onChange={(e) =>
                setRole(e.target.value as "STUDENT" | "TEACHER")
              }
            >
              <option value="STUDENT">Student</option>
              <option value="TEACHER">Teacher</option>
            </select>

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />

            {role === "TEACHER" && (
              <input
                type="text"
                placeholder="Employee ID"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                disabled={loading}
              />
            )}

            <button type="submit" disabled={loading}>
              {loading ? "Signing In..." : "LOGIN"}
            </button>

          </form>

          <p className="social-text">
            University Admission Management System
          </p>

        </div>

      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}