import { User } from "@/models/interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type UserState = User | null;

const userSlice = createSlice({
  name: "user",
  initialState: null as UserState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => action.payload,
    clearUser: () => null,
  },
});

export default userSlice;
