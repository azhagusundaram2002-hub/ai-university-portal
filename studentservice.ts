import api from "../api";

export interface StudentRequest {
  studentId: string;
  name: string;
  marks: number;
  category: "GENERAL" | "OBC" | "SC" | "ST";
  applicationDate: string;
  preferredCourse: number;
}

export interface Course {
  id: number;
  courseName: string;
}

export interface Allocation {
  id: number;
  status: string;
}

export interface StudentResponse {
  id: number;
  studentId: string;
  name: string;
  marks: number;
  category: "GENERAL" | "OBC" | "SC" | "ST";
  applicationDate: string;
  preferredCourse: number;
  course?: Course;
  allocation?: Allocation;
  createdAt: string;
}

export const createStudent = async (
  data: StudentRequest
): Promise<StudentResponse> => {
  try {
    const response = await api.post<StudentResponse>(
      "/students",
      data
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getStudents = async (): Promise<StudentResponse[]> => {
  const response = await api.get<StudentResponse[]>(
    "/students"
  );

  return response.data;
};

export const getStudentById = async (
  id: number
): Promise<StudentResponse> => {
  const response = await api.get<StudentResponse>(
    `/students/${id}`
  );

  return response.data;
};