type Account = {
  id: string;
  username: string;
  email: string;
  name: string;
  lastName: string;
  phone?: string;
  gender?: string;
  birthday?: Date;
  created?: Date;
  fullName?: string;
};

export default Account;
