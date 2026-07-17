import { useEffect, useState } from "react";
import Navbar from "./navbar";
import "./allocation.css";
import { toast } from "react-toastify";
import {
  allocateStudents,
  getAllocations,
} from "../services/allocationservice";
import type { AllocationResponse } from "../services/allocationservice";

const Allocation = () => {
  const [allocations, setAllocations] = useState<AllocationResponse[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllocations();
  }, []);

  const loadAllocations = async () => {
    try {
      const data = await getAllocations();
      setAllocations(data);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load allocations"
      );
    }
  };

  const handleAllocation = async () => {
    try {
      setLoading(true);

      const result = await allocateStudents();

      if (result.length === 0) {
        toast.info("All students are already allocated.");
      } else {
        toast.success("Seat Allocation Completed Successfully");
      }

      await loadAllocations();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Seat Allocation Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <Navbar />

      <div className="main-content">
        <div className="allocation-header">
          <h1>Seat Allocation</h1>

          <button
            onClick={handleAllocation}
            disabled={loading}
          >
            {loading ? "Allocating..." : "Allocate Seats"}
          </button>
        </div>

        <table className="allocation-table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Marks</th>
              <th>Category</th>
              <th>Allocated Course</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {allocations.length > 0 ? (
              allocations.map((allocation) => (
                <tr key={allocation.id}>
                  <td>{allocation.student.studentId}</td>
                  <td>{allocation.student.name}</td>
                  <td>{allocation.student.marks}</td>
                  <td>{allocation.student.category}</td>
                  <td>{allocation.course.courseName}</td>

                  <td>
                    <span
                      className={
                        allocation.status === "ALLOCATED"
                          ? "allocated"
                          : "waiting"
                      }
                    >
                      {allocation.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  style={{ textAlign: "center" }}
                >
                  No Allocation Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Allocation;