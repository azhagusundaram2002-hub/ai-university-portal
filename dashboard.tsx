import { useEffect, useState } from "react";
import DashboardCard from "./dashboardcard";
import "./Dashboard.css";
import { MessageCircle, Send, X } from "lucide-react";
import { chatWithAi } from "../services/aiservice";

import { getStudents } from "../services/studentservice";
import { getCourses } from "../services/courseservice";
import { getAllocations } from "../services/allocationservice";

import type { StudentResponse } from "../services/studentservice";
import type { CourseResponse } from "../services/courseservice";
import type { AllocationResponse } from "../services/allocationservice";

const Dashboard = () => {
  const [students, setStudents] = useState<StudentResponse[]>([]);
  const [courses, setCourses] = useState<CourseResponse[]>([]);
  const [allocations, setAllocations] = useState<AllocationResponse[]>([]);


  useEffect(() => {
    loadDashboard();
  }, []);
  const [showChat, setShowChat] = useState(false);
const [question, setQuestion] = useState("");
const [loadingAi, setLoadingAi] = useState(false);

const [messages, setMessages] = useState<
  {
    sender: "user" | "ai";
    text: string;
  }[]
>([
  {
    sender: "ai",
    text: "👋 Hello! I'm your University AI Assistant. How can I help you today?",
  },
]);

  const loadDashboard = async () => {
    try {
      const [studentData, courseData, allocationData] =
        await Promise.all([
          getStudents(),
          getCourses(),
          getAllocations(),
        ]);

      setStudents(studentData);
      setCourses(courseData);
      setAllocations(allocationData);
    } catch (err) {
      console.log(err);
    }
  };

  const allocatedStudents = allocations.filter(
    (a) => a.status === "ALLOCATED"
  );

  const waitlistedStudents = allocations.filter(
    (a) => a.status === "WAITLISTED"
  );
  const askAi = async () => {
  if (!question.trim()) return;

  const userQuestion = question;

  setMessages((prev) => [
    ...prev,
    {
      sender: "user",
      text: userQuestion,
    },
  ]);

  setQuestion("");
  setLoadingAi(true);

  try {
    const response = await chatWithAi(userQuestion);

    setMessages((prev) => [
      ...prev,
      {
        sender: "ai",
        text: response.reply,
      },
    ]);
  } catch {
    setMessages((prev) => [
      ...prev,
      {
        sender: "ai",
        text: "Unable to connect to AI service.",
      },
    ]);
  } finally {
    setLoadingAi(false);
  }
};

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>

      <div className="dashboard-grid">
        <DashboardCard
          title="Students"
          value={students.length}
          color="blue"
        />

        <DashboardCard
          title="Courses"
          value={courses.length}
          color="green"
        />

        <DashboardCard
          title="Allocated"
          value={allocatedStudents.length}
          color="orange"
        />

        <DashboardCard
          title="Waitlisted"
          value={waitlistedStudents.length}
          color="purple"
        />
      </div>

      <div className="dashboard-section">
        <h2>Allocated Students</h2>

        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Marks</th>
              <th>Category</th>
              <th>Course</th>
            </tr>
          </thead>

          <tbody>
            {allocatedStudents.length > 0 ? (
              allocatedStudents.map((item) => (
                <tr key={item.id}>
                  <td>{item.student.studentId}</td>
                  <td>{item.student.name}</td>
                  <td>{item.student.marks}</td>
                  <td>{item.student.category}</td>
                  <td>{item.course.courseName}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>No Allocated Students</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="dashboard-section">
        <h2>Course Seat Availability</h2>

        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Course</th>
              <th>General</th>
              <th>OBC</th>
              <th>SC</th>
              <th>ST</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td>{course.courseName}</td>
                <td>{course.generalSeats}</td>
                <td>{course.obcSeats}</td>
                <td>{course.scSeats}</td>
                <td>{course.stSeats}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="course-statistics">
        <h2>Course Statistics</h2>

        {courses.map((course) => {
          const availableSeats =
            course.generalSeats +
            course.obcSeats +
            course.scSeats +
            course.stSeats;

          const allocatedSeats =
            course.totalSeats - availableSeats;

          const percentage = Math.round(
            (allocatedSeats / course.totalSeats) * 100
          );

          return (
            <div
              key={course.id}
              className="course-card"
            >
              <div className="course-header">
                <h3>{course.courseName}</h3>

                <span>
                  {allocatedSeats}/{course.totalSeats} Seats Filled
                </span>
              </div>

              <div className="progress">
                <div
                  className="progress-fill"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>

              <div className="seat-grid">
                <div>
                  <strong>General</strong>
                  <p>{course.generalSeats} Left</p>
                </div>

                <div>
                  <strong>OBC</strong>
                  <p>{course.obcSeats} Left</p>
                </div>

                <div>
                  <strong>SC</strong>
                  <p>{course.scSeats} Left</p>
                </div>

                <div>
                  <strong>ST</strong>
                  <p>{course.stSeats} Left</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating AI Button */}

      <button
        className="ai-fab"
        onClick={() => setShowChat(true)}
      >
        <MessageCircle size={28} />
      </button>

      {/* AI Chat */}

      {showChat && (
        <div className="ai-chat">
          <div className="ai-header">
            <span>University AI Assistant</span>

            <X
              size={18}
              onClick={() => setShowChat(false)}
              style={{ cursor: "pointer" }}
            />
          </div>

          <div className="ai-body">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.sender === "user"
                    ? "user-message"
                    : "ai-message"
                }
              >
                {msg.text}
              </div>
            ))}

            {loadingAi && (
              <div className="ai-message">
                Thinking...
              </div>
            )}
          </div>

          <div className="ai-footer">
            <input
              type="text"
              placeholder="Ask something..."
              value={question}
              onChange={(e) =>
                setQuestion(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  askAi();
                }
              }}
            />

            <button onClick={askAi}>
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;