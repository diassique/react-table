import React from 'react';
import { TableRowDetailsProps } from '../types';

const TableRowDetails: React.FC<TableRowDetailsProps> = ({ user }) => {
  return (
    <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', textAlign: 'left' }}>
      <p>ID: {user._id}</p>
      <p>First Name: {user.firstName}</p>
      <p>Last Name: {user.lastName}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
    </div>
  );
};

export default TableRowDetails;
