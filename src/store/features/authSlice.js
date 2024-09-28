import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { removeItemsFromLocalStorage } from "../../utils/helper";
import { _config } from "../../constants";

const initialState = {
  isLoggedIn: false,
  data: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateAuthUser: (state, action) => {
      state.data = action.payload;
      state.isLoggedIn = true;
    },
    userLogout: (state, action) => {
      state.data = {};
      state.isLoggedIn = false;
      removeItemsFromLocalStorage(_config.ID);
      removeItemsFromLocalStorage(_config.TOKEN);
    },
  },
});
export const { updateAuthUser, userLogout } = authSlice.actions;

export const useAuth = () => {
  return useSelector((state) => state.authUser);
};

export default authSlice.reducer;
