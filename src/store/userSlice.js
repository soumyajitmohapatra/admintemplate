import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "users",
  initialState: {
    islogged: false,
    isLoading: true,
    data: null,
  },
  reducers: {
    userAdded: (state, action) => {
      if (!state.islogged) {
        state.islogged = true;
        state.isLoading = false;
        state.data = action.payload.data;
      }
    },
    userRemoved: (state, action) => {
      if (state.islogged) {
        state.islogged = false;
        state.data = null;
      }
    },
    userUpdated: (state, action) => {
      if (state.islogged && state.data) {
        state.data = {
          ...state.data,
          ...action.payload.data,
        };
      }
    },
  },
});

export const { userAdded, userRemoved, userUpdated } = slice.actions;

export default slice.reducer;
