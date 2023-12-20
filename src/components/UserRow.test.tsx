/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from '@testing-library/react';
import UserRow from './UserRow';

describe('UserRow', () => {
  const mockUser = {
    _id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '1234567890',
  };

  const mockOnRowClick = jest.fn();

  it('renders user data correctly', () => {
    render(<UserRow user={mockUser} onRowClick={mockOnRowClick} />);
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Doe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('1234567890')).toBeInTheDocument();
  });

  it('calls onRowClick when row is clicked', () => {
    render(<UserRow user={mockUser} onRowClick={mockOnRowClick} />);
    fireEvent.click(screen.getByText('John'));
    expect(mockOnRowClick).toHaveBeenCalledWith(mockUser);
  });
});
