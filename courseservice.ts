import api from "../api";

export interface CourseRequest {
  courseName: string;
  totalSeats: number;
  generalSeats: number;
  obcSeats: number;
  scSeats: number;
  stSeats: number;
}

export interface CourseResponse {
  id: number;
  courseName: string;
  totalSeats: number;
  generalSeats: number;
  obcSeats: number;
  scSeats: number;
  stSeats: number;
}

export const createCourse = async (
  data: CourseRequest
): Promise<CourseResponse> => {
  const response = await api.post<CourseResponse>("/courses", data);
  return response.data;
};

export const getCourses = async (): Promise<CourseResponse[]> => {
  const response = await api.get<CourseResponse[]>("/courses");
  return response.data;
};

export const getCourseById = async (
  id: number
): Promise<CourseResponse> => {
  const response = await api.get<CourseResponse>(`/courses/${id}`);
  return response.data;
};

export const deleteCourse = async (id: number) => {
  const response = await api.delete(`/courses/${id}`);
  return response.data;
};