import Cookies from 'js-cookie';

export const getAccessToken =()=>Cookies.get('token')

export const setAccessToken =(token)=>{Cookies.set('token',token)}
export const removeAccessToken =()=>{Cookies.remove('token')}

export { AuthWrapper } from "./AuthWrapper"