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

export interface Task {
  id?: string;
  title: string;
  date: string;
  creator_id: string;
  asignTo?: [string];
  status: string;
  description?: string;
}