export type TUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role:
  | 'user'
  | 'doctor'
  | 'accounts-specialist'
  | 'finance-manager'
  | 'admin'
  | 'super-admin';
  status: 'active' | 'suspend';
  isDeleted: boolean;
};
