import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
  name: 'login',
  initialState:{
    value: localStorage.getItem('token')?true:false
  },
  reducers:{
    setLogin: (state, action)=>{
      state.value = action.payload;
    },
  },
});

export const { setLogin } = loginSlice.actions;

export const selectLogin = state => state.login.value;

export default loginSlice.reducer;