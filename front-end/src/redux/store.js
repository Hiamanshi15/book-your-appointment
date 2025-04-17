import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import serviceProviderReducer from './serviceProviderSlice';
import contactReducer from './contactSlice'; 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    serviceProvider: serviceProviderReducer,
    contact: contactReducer, 
  },
});
