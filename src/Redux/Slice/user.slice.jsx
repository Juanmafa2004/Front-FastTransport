import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uuid: "",
  name: "",
  lastname: "",
  email: "",
  isConfirmed: false,
  dateJoined: "",
  gender: "",
  phoneNumber: 0,
  password: "",
  userType: 1,
  dateOfBirth: "",
  isActive: false,
  status: 400,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
    clearUser: () => initialState,
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
