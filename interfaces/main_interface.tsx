export interface User {
  email: string;
  firstname: string;
  lastname: string;
  avatar: string;
  createdAt: any;
}

// export interface Task {
//   _id?: string;
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
// _id: "1",
//     title: "Task 1",
//     description: "Description for task 1",
//     status: "Todo",
//     dueDate: "2021-12-01",
//     priority: "High",
export interface Task {
  _id?: string;
  title: string;
  dueDate: string;
  description?: string;
  status: string;
  priority?: string;
  creator_id: string;
  assignee_id: string;
  createdAt?: any;
}