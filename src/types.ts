export type User = {
  _id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export type SortKey = keyof User;

export type SortConfig = {
  key: SortKey;
  direction: 'asc' | 'desc';
};

export type UserRowProps = {
  user: User;
  onRowClick: (user: User) => void;
};

export type TableRowDetailsProps = {
  user: User;
};