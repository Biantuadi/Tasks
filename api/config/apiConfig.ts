const API_URL = "https://task-api-kappa.vercel.app/";
// const API_URL = "https://studapp-back.vercel.app";

export const API_ENDPOINTS = {
  ME: (userId: string) => `${API_URL}/users/me?userId=${userId}`,
  ALL_USERS: `${API_URL}/user/all`,
  USER_BY_ID: (userId: string) => `${API_URL}/user/${userId}`,
  ALL_GROUPS: `${API_URL}/group/all`,

  // auth
  LOGIN: `${API_URL}/auth/login`,
  REGISTER: `${API_URL}/auth/register`,

  // tasks
  TASKS: `${API_URL}/task/all`,
  CREATE_TASK: `${API_URL}/task/create`,
  UPDATE_TASK_STATUS: `${API_URL}/task/change/status`,
  UPDATE_TASK: `${API_URL}/task/update`,
  DELETE_TASK: (taskId: string) => `${API_URL}/task/delete/${taskId}`,

};