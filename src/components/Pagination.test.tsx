import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination', () => {
  it('renders the correct number of pages', () => {
    const mockOnChange = jest.fn();
    render(<Pagination currentPage={1} totalPages={5} onChange={mockOnChange} />);
    expect(screen.getAllByRole('button')).toHaveLength(5);
  });

  it('calls onChange with the correct page number', () => {
    const mockOnChange = jest.fn();
    render(<Pagination currentPage={1} totalPages={5} onChange={mockOnChange} />);
    fireEvent.click(screen.getByText('3'));
    expect(mockOnChange).toHaveBeenCalledWith(3);
  });
});

export {};