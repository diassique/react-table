import React from 'react'
import { TableCell, TableRow} from '@mui/material';
import { UserRowProps } from '../types';

const UserRow: React.FC<UserRowProps> = ({ user, onRowClick }) => {
  return (
    <TableRow
      key={user._id}
      sx={{ '&:nth-of-type(odd)': { backgroundColor: '#E1F3FF' } }}
      onClick={() => onRowClick(user)}
    >
      <TableCell>{user._id}</TableCell>
      <TableCell>{user.firstName}</TableCell>
      <TableCell>{user.lastName}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.phone}</TableCell>
    </TableRow>
  );
};

export default UserRow;