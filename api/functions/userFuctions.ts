const fakeUser = {
  id: 234,
email: "john@doe.com",
firstname: "John",
lastname: "Doe",
  avatar: "https://randomuser.me/api/portraits"
};

export const users = [
  {
    id: 234,
  email: "john@doe.com",
  firstname: "John",
  lastname: "Doe",
    avatar: "https://randomuser.me/api/portraits"
  },
  {
    id: 2,
    firstname: "Jane",
    email: "test@",
    avatar: "https://letambour.net/wp-content/uploads/2024/01/FB_IMG_1704274242647.jpg",
    role: "pasteur"
  },
]

export async function getAllUsers() {
  // const users:any = [];
  return users;
}



export async function getUserById(userId: string) {
  const user:any = {
    
  };
  return fakeUser;
}