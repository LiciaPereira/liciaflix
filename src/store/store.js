import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice"; // Import the userSlice reducer

export default configureStore({
  reducer: {
    user: userReducer, // Use the userReducer here
  },
});
