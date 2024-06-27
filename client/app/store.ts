import userSlice from "@/slicer/user";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const { setUser, clearUser } = userSlice.actions;

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useUser: TypedUseSelectorHook<RootState> = useSelector;

export const useUserDispatch = () => useDispatch<AppDispatch>();

export default store;
