export const getAccessToken =()=>localStorage.getItem('token')

export const setAccessToken =(token)=>{localStorage.setItem('token',token)}
export const removeAccessToken =()=>{localStorage.removeItem('token')}

export { AuthWrapper } from "./AuthWrapper"