import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { set, selectLogin } from '@components/slices/loginSlice'
import { LoginForm, SignupForm } from '@components/forms'

// Default should show login screen, allows for defined children when unauthenticated

const DefaultUnauthenticated=()=>{
  const [form, setForm] = useState('LogIn')

  return(
    <div style={{align:'start'}}>
      Please login to view this page
      <div style={{width:"50%",}}>
      {
        form==='SignUp'
          ?<SignupForm swap={()=>setForm('LogIn')}/>
          :<LoginForm swap={()=>setForm('SignUp')}/>
      }
      </div>
    </div>
  )
}


export const AuthWrapper = ({children, childrenWhenUnauthenticated=<DefaultUnauthenticated/>})=> {
  const loggedIn = useSelector(selectLogin)
  return(
    loggedIn
      ?children
      :childrenWhenUnauthenticated
  )
}