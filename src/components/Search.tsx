import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

type SearchProps = {
  onSearch: (query: string) => void;
};

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSearch}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        marginBottom: 2
      }}
    >
      <TextField
        variant="outlined"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Введите ваш запрос..."
        sx={{ 
          flexGrow: 1,
          '.MuiInputBase-input': {
            height: 40,
            padding: '0 14px',
          },
        }}
      />
      <Button 
        type="submit"
        variant="contained" 
        color="primary" 
        sx={{ height: 40, whiteSpace: 'nowrap' }}
      >
        Найти
      </Button>
    </Box>
  );
};

export default Search;
