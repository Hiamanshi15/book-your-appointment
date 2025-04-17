// src/redux/serviceProviderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// GET service provider by user ID
export const getServiceProviderById = createAsyncThunk(
  'serviceProvider/getById',
  async ({ userId, token }, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/service-providers/by-user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// UPDATE service provider
export const updateServiceProvider = createAsyncThunk(
  'serviceProvider/update',
  async ({ id, updatedData, token }, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/service-providers/${id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// DELETE service provider
export const deleteServiceProvider = createAsyncThunk(
  'serviceProvider/delete',
  async ({ id, token }, thunkAPI) => {
    try {
      await axios.delete(`http://localhost:5000/api/service-providers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Inside serviceProviderSlice.js get All Service Providers
export const getAllServiceProviders = createAsyncThunk(
  'serviceProvider/getAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:5000/api/service-providers');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


// Slice
const serviceProviderSlice = createSlice({
  name: 'serviceProvider',
  initialState: {
    provider: null,
    loading: false,
    error: null,
    providers: [], // For all providers
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Provider
      .addCase(getServiceProviderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getServiceProviderById.fulfilled, (state, action) => {
        state.loading = false;
        state.provider = action.payload;
      })
      .addCase(getServiceProviderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Provider
      .addCase(updateServiceProvider.fulfilled, (state, action) => {
        state.provider = action.payload; // ✅ fix: direct assignment
      })

      // Delete Provider
      .addCase(deleteServiceProvider.fulfilled, (state) => {
        state.provider = null;
      });

      builder
      .addCase(getAllServiceProviders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllServiceProviders.fulfilled, (state, action) => {
        state.loading = false;
        state.providers = action.payload;
      })
      .addCase(getAllServiceProviders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default serviceProviderSlice.reducer;
