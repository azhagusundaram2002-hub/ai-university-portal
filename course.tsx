import { useState } from "react";
import Navbar from "./navbar";
import "./course.css";
import { createCourse } from "../services/courseservice";
import { toast } from "react-toastify";

const Course = () => {
  const [courseName, setCourseName] = useState("");
  const [totalSeats, setTotalSeats] = useState("");
  const [generalSeats, setGeneralSeats] = useState("");
  const [obcSeats, setObcSeats] = useState("");
  const [scSeats, setScSeats] = useState("");
  const [stSeats, setStSeats] = useState("");

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (
    !courseName ||
    !totalSeats ||
    !generalSeats ||
    !obcSeats ||
    !scSeats ||
    !stSeats
  ) {
    toast.warning("Please fill all fields correctly.");
    return;
  }

  const total = Number(totalSeats);
  const general = Number(generalSeats);
  const obc = Number(obcSeats);
  const sc = Number(scSeats);
  const st = Number(stSeats);

  if (
    total <= 0 ||
    general < 0 ||
    obc < 0 ||
    sc < 0 ||
    st < 0
  ) {
    toast.warning("Seat values are invalid.");
    return;
  }

  if (general + obc + sc + st !== total) {
    toast.error("Reserved seats must equal Total Seats.");
    return;
  }

  try {
    await createCourse({
      courseName,
      totalSeats: total,
      generalSeats: general,
      obcSeats: obc,
      scSeats: sc,
      stSeats: st,
    });

    toast.success("Course Created Successfully");

    setCourseName("");
    setTotalSeats("");
    setGeneralSeats("");
    setObcSeats("");
    setScSeats("");
    setStSeats("");
  } catch (error: any) {
    toast.error(
      error.response?.data?.message || "Failed to create course"
    );
  }
};

  return (
    <div className="home">
      <Navbar />

      <div className="main-content">
        <h1>Course Management</h1>

        <form
          className="course-form"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label>Course Name</label>
            <input
              type="text"
              placeholder="Enter Course Name"
              value={courseName}
              onChange={(e) =>
                setCourseName(e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Total Seats</label>
        <input
  type="number"
  placeholder="Enter Total Seats"
  value={totalSeats}
  onChange={(e) => setTotalSeats(e.target.value)}
/>
          </div>

          <div className="seat-section">
            <h2>Reserved Seats by Category</h2>

            <div className="seat-grid">
              <div className="form-group">
                <label>General</label>
             <input
  type="number"
  placeholder="General Seats"
  value={generalSeats}
  onChange={(e) => setGeneralSeats(e.target.value)}
/>
              </div>

              <div className="form-group">
                <label>OBC</label>
          <input
  type="number"
  placeholder="OBC Seats"
  value={obcSeats}
  onChange={(e) => setObcSeats(e.target.value)}
/>
              </div>

              <div className="form-group">
                <label>SC</label>
           <input
  type="number"
  placeholder="SC Seats"
  value={scSeats}
  onChange={(e) => setScSeats(e.target.value)}
/>
              </div>

              <div className="form-group">
                <label>ST</label>
           <input
  type="number"
  placeholder="ST Seats"
  value={stSeats}
  onChange={(e) => setStSeats(e.target.value)}
/>
              </div>
            </div>
          </div>

          <button type="submit">
            Create Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default Course;