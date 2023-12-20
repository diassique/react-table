import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel } from '@mui/material';
import { fetchUsers, setCurrentPage } from '../store/usersSlice';
import { RootState, AppDispatch  } from '../store/store';
import Pagination from './Pagination';
import Search from './Search';
import TableRowDetails from './TableRowDetails';
import UserRow from './UserRow';
import { User, SortKey, SortConfig } from '../types';

const ITEMS_PER_PAGE = 50;

const UsersTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.users.data);
  const status = useSelector((state: RootState) => state.users.status);
  const error = useSelector((state: RootState) => state.users.error);
  const currentPage = useSelector((state: RootState) => state.users.currentPage);
  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: '_id', direction: 'asc' });

  const handleRowClick = (user: User) => {
    setSelectedUser(user);
  };

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    setSelectedUser(null);
  };

  const handleSort = (key: SortKey) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
  };

  const sortedUsers = useMemo(() => {
    const sortByKey = (a: User, b: User): number => {
      if (['firstName', 'lastName', 'email', 'phone', '_id'].includes(sortConfig.key)) {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
        } else if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortConfig.direction === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }
      }
      return 0;
    };
    return [...users].sort(sortByKey);
  }, [users, sortConfig]);

  // Filter users based on search query
  const filteredUsers = useMemo(() => {
    if (!searchQuery) {
      return sortedUsers;
    }
    return sortedUsers.filter((user) => 
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery)
    );
  }, [sortedUsers, searchQuery]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredUsers.slice(startIndex, endIndex);
  }, [filteredUsers, currentPage]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', padding: '20px' }}>
      <Search onSearch={handleSearch} />
      <TableContainer component={Paper} sx={{ width: 'auto', maxWidth: '100%' }}>
        <Table aria-label="simple table" size="medium">
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === '_id'}
                  direction={sortConfig.direction}
                  onClick={() => handleSort('_id')}
                >
                  ID
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'firstName'}
                  direction={sortConfig.direction}
                  onClick={() => handleSort('firstName')}
                >
                  First Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'lastName'}
                  direction={sortConfig.direction}
                  onClick={() => handleSort('lastName')}
                >
                  Last Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'email'}
                  direction={sortConfig.direction}
                  onClick={() => handleSort('email')}
                >
                  Email
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'phone'}
                  direction={sortConfig.direction}
                  onClick={() => handleSort('phone')}
                >
                  Phone
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map((user) => (
              <UserRow key={user._id} user={user} onRowClick={handleRowClick} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination currentPage={currentPage} totalPages={totalPages} onChange={handlePageChange} />
       {selectedUser && <TableRowDetails user={selectedUser} />}
    </div>
  );
};

export default UsersTable;