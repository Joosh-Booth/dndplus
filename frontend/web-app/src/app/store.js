import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '@components/slices/loginSlice'

export default configureStore({
  reducer: {
    login: loginReducer
  }
})