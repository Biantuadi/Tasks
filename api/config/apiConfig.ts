const API_URL = "http://localhost:8080";
// const API_URL = "https://studapp-back.vercel.app";

export const API_ENDPOINTS = {
  ME: (userId: string) => `${API_URL}/users/me?userId=${userId}`,
  USERS: `${API_URL}/users`,
  LOGIN: `${API_URL}/auth/login`,
  REGISTER: `${API_URL}/auth/register`,

  // tasks
  TASKS: `${API_URL}/tasks`,
  CREATE_TASK: `${API_URL}/tasks`,
  UPDATE_ORDER_STATUS: (orderId: string) => `${API_URL}/tasks/${orderId}/status`,
  DELETE_ORDER: (orderId: string) => `${API_URL}/tasks/${orderId}`,

};