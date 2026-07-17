import api from "../api";

export interface AllocationStudent {
  id: number;
  studentId: string;
  name: string;
  marks: number;
  category: "GENERAL" | "OBC" | "SC" | "ST";
}

export interface AllocationCourse {
  id: number;
  courseName: string;
}

export interface AllocationResponse {
  id: number;
  studentId: number;
  courseId: number;
  status: string;
  allocatedAt: string;
  student: AllocationStudent;
  course: AllocationCourse;
}

export const allocateStudents = async (): Promise<
  AllocationResponse[]
> => {
  const response = await api.post<AllocationResponse[]>(
    "/allocation"
  );

  return response.data;
};

export const getAllocations = async (): Promise<
  AllocationResponse[]
> => {
  const response = await api.get<AllocationResponse[]>(
    "/allocation"
  );

  return response.data;
};