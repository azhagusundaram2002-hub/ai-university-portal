import { useEffect, useState } from "react";
import Navbar from "./navbar";
import "./student.css";
import { toast } from "react-toastify";

import { createStudent } from "../services/studentservice";
import { getCourses } from "../services/courseservice";

const Students = () => {
  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [marks, setMarks] = useState("");
  const [category, setCategory] = useState("");
  const [applicationDate, setApplicationDate] = useState("");
  const [preferredCourse, setPreferredCourse] = useState("");

  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data);
    } catch {
      toast.error("Failed to load courses");
    }
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (
    !studentId ||
    !name ||
    !marks ||
    !category ||
    !applicationDate ||
    !preferredCourse
  ) {
    toast.warning("Please fill all fields");
    return;
  }

  try {
    console.log("Before API");

    const response = await createStudent({
      studentId,
      name,
      marks: Number(marks),
      category: category as "GENERAL" | "OBC" | "SC" | "ST",
      applicationDate,
      preferredCourse: Number(preferredCourse),
    });

    console.log("API Success:", response);

    toast.success("Student Registered Successfully");

    setStudentId("");
    setName("");
    setMarks("");
    setCategory("");
    setApplicationDate("");
    setPreferredCourse("");
  } catch (error: any) {
    console.log("API Error:", error);

    if (error.response) {
      const { message } = error.response.data;

      if (Array.isArray(message)) {
        toast.error(message.join(", "));
      } else {
        toast.error(message);
      }
    } else {
      toast.error("Server not reachable");
    }
  }
};

  return (
    <div className="home">
      <Navbar />

      <div className="main-content">
        <h1>Student Registration</h1>

        <form className="student-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Student ID</label>
            <input
              type="text"
              placeholder="Enter Student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Student Name</label>
            <input
              type="text"
              placeholder="Enter Student Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Marks</label>
            <input
              type="number"
              placeholder="Enter Marks"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="GENERAL">General</option>
              <option value="OBC">OBC</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
            </select>
          </div>

          <div className="form-group">
            <label>Application Date</label>
            <input
              type="date"
              value={applicationDate}
              onChange={(e) => setApplicationDate(e.target.value)}
            />
          </div>

          <div className="course-section">
            <div className="form-group">
              <label>Preferred Course</label>

              <select
                value={preferredCourse}
                onChange={(e) => setPreferredCourse(e.target.value)}
              >
                <option value="">Select Course</option>

                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.courseName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit">
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default Students;