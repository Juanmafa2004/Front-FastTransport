import { createSlice } from "@reduxjs/toolkit";
import { encryptInformation, decryptInformation } from "@Utils";

const initialState = {
  id_rol: 0,
  rol: "",
  correo: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const newState = action.payload;
      localStorage.setItem("user", encryptInformation(newState));
      return newState;
    },
    loadUser: (state) => {
      const encryptedUser = localStorage.getItem("user");
      if (encryptedUser) {
        return  decryptInformation(encryptedUser) ;
      }
      return state;
    },
    clearUser: () => {
      localStorage.removeItem("user");
      return initialState;
    },
  },
});

export const { setUser, loadUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
