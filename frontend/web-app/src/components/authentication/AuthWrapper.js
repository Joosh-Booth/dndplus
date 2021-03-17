import React, { useState } from "react";
import { useSelector } from 'react-redux'

import { LoginForm, SignupForm } from '@components/forms'
import { H1 } from '@components/headers'
import { selectLogin } from '@components/slices/loginSlice'

// Default should show login screen, allows for defined children when unauthenticated

const DefaultUnauthenticated=()=>{
  const [form, setForm] = useState('LogIn')

  return(
    <div style={{padding:"0 30px 30px 30px"}}>
      <H1>You must be logged in to view this page</H1>
      <div style={{width:"40%", paddingTop:30}}>
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