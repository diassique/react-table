// src/features/users/usersSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export type User = {
  _id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

type UsersState = {
  data: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
};

export const fetchUsers = createAsyncThunk<User[]>('users/fetchUsers', async () => {
  const response = await axios.get<User[]>('https://mock-server-json-f852848571df.herokuapp.com/users');
  return response.data;
});

const initialState: UsersState = {
  data: [],
  status: 'idle',
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;