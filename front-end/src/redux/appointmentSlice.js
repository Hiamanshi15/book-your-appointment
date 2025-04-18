// In your appointmentSlice.js
import { createSlice } from '@reduxjs/toolkit';

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState: {
    loading: false,
    appointment: null,
    error: null
  },
  reducers: {
    makeAppointmentStart: (state) => {
      state.loading = true;
    },
    makeAppointmentSuccess: (state, action) => {
      state.loading = false;
      state.appointment = action.payload;
    },
    makeAppointmentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { makeAppointmentStart, makeAppointmentSuccess, makeAppointmentFailure } = appointmentSlice.actions;

export const makeAppointment = (appointmentData) => async (dispatch) => {
  dispatch(makeAppointmentStart());
  try {
    const response = await fetch('/api/appointments/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming JWT in localStorage
      },
      body: JSON.stringify(appointmentData)
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(makeAppointmentSuccess(data.appointment));
    } else {
      const errorData = await response.json();
      dispatch(makeAppointmentFailure(errorData.message));
    }
  } catch (error) {
    dispatch(makeAppointmentFailure(error.message));
  }
};

export default appointmentSlice.reducer;
