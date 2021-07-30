export const getAccessToken = () =>  localStorage.getItem('token') 
export const getId = () => localStorage.getItem('id')

export const setAccessToken = (token) => { localStorage.setItem('token', token) }
export const setId = (id) => { localStorage.setItem('id', id) }

export const removeAccessToken = () => { localStorage.removeItem('token') }
export const removeId = () => { localStorage.removeItem('id') }

export { LoginWrapper } from "./LoginWrapper"
export { default as AuthWrapper } from "./AuthWrapper"
export { PrivateRoute } from "./PrivateRoute"