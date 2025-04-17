import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// POST API to submit contact form
export const submitContact = createAsyncThunk(
  'contact/submitContact',
  async (contactData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/contact', contactData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetContactState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContact.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(submitContact.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export const { resetContactState } = contactSlice.actions;
export default contactSlice.reducer;
