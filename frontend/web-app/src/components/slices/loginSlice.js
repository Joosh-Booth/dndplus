import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
  name: 'login',
  initialState:{
    value: localStorage.getItem('token')?true:false
  },
  reducers:{
    set: (state, action)=>{
      state.value = action.payload;
    },
  },
});

export const { set } = loginSlice.actions;

export const selectLogin = state => state.login.value;

export default loginSlice.reducer;