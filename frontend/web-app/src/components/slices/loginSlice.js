import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie';

export const loginSlice = createSlice({
  name: 'login',
  initialState:{
    value: Cookies.get('token')?true:false
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