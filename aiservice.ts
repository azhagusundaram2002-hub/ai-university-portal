import api from "../api";

export interface AiRequest {
  message: string;
}

export interface AiResponse {
  reply: string;
}

export const chatWithAi = async (
  message: string
): Promise<AiResponse> => {
  const response = await api.post<AiResponse>(
    "/ai/chat",
    {
      message,
    }
  );

  return response.data;
};