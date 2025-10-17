import { createSlice } from "@reduxjs/toolkit";

const getUserFromLocalStorage = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};


const initialState = { user: getUserFromLocalStorage() };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
loginSuccess: (state, action) => {
  state.user = action.payload; // oo dhan object-ka user
  localStorage.setItem("user", JSON.stringify(action.payload));
},
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
