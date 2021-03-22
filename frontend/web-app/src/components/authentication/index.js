import Cookies from 'js-cookie';

export const getAccessToken =()=>Cookies.get('token')
export const getId =()=>Cookies.get('id')

export const setAccessToken =(token)=>{Cookies.set('token',token,{sameSite:'None',secure:true})}
export const setId =(id)=>{Cookies.set('id',id,{sameSite:'None',secure:true})}
export const removeAccessToken =()=>{Cookies.remove('token')}
export const removeId =()=>{Cookies.remove('id')}

export { AuthWrapper } from "./AuthWrapper"