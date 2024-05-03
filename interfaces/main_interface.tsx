export interface User {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  avatar: string;
  preferences: {
    theme: string;
    language: string;
    notifications: boolean;
  };
  role: string;
  createdAt: any;
}

// export interface Task {
//   id?: string;
//   title: string;
//   type?: string;
//   date: string;
//   start: string;
//   end?: string;
//   address: string;
//   city?: string;
//   country?: string;
//   creator_id: string;
//   status: string;
//   meetLink?: string;
//   description?: string;
// }
// id: "1",
//     title: "Task 1",
//     description: "Description for task 1",
//     status: "Todo",
//     dueDate: "2021-12-01",
//     priority: "High",
export interface Task {
  id?: string;
  title: string;
  dueDate: string;
  description?: string;
  status: string;
  priority?: string;
  creator_id: string;
  assignee_id: string;
  createdAt?: any;
}