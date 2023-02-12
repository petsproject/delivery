import { configureStore } from '@reduxjs/toolkit';
import { deliveriesReducer } from './slices/delivery-slice';
import { userReducer } from './slices/user-slice';

const store = configureStore({
  reducer: {
    user: userReducer,
    deliveries: deliveriesReducer,
  },
});
export { store };
