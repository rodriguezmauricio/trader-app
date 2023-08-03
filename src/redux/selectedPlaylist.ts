import { createSlice } from "@reduxjs/toolkit";

const selectedPlaylist = createSlice({
  name: "playlist",
  initialState: "",
  reducers: {
    // define o estado como o id da playlist recebida
    setSelectedPlaylist: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { setSelectedPlaylist } = selectedPlaylist.actions;
export default selectedPlaylist.reducer;
