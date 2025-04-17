import { createSlice, configureStore } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};
const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addTopastes: (state, action) => {
      const paste = action.payload;
      if (!paste.title || paste.title.trim() === "") {
        toast.error("Title is required to create a paste.");
        return;
      }
      // Check if paste with same title or _id already exists
      const exists = state.pastes.some(
        (p) => p.title === paste.title || p._id === paste._id
      );
    
      if (exists) {
        toast.error("Paste with the same title or ID already exists!");
        return;
      }
    
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste created successfully");
    },
    updateTopastes: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id);

      if (index >= 0) {
        state.pastes[index] = paste;

        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste updated");
      }
    },
    resetAllpastes: (state, action) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
      toast.success("Removed all pastes");
    },
    removeFrompastes: (state, action) => {
      const pasteId = action.payload;
      const index = state.pastes.findIndex((item) => item._id === pasteId);

      if (index >= 0) {
        state.pastes.splice(index, 1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));

      }
    },
  },
});

export const { addTopastes, updateTopastes, resetAllpastes, removeFrompastes } =
  pasteSlice.actions;

export default pasteSlice.reducer;
