import { useState } from 'react'
import Helmet from 'react-helmet'
import { useSelector } from 'react-redux'
import { VerticalFlexContainer } from '@components/containers'
import { LoginForm, SignupForm } from "@components/forms";
import { selectLogin } from '@components/slices/loginSlice'

//Return home button
const Login = () => {
  const loggedIn = useSelector(selectLogin)
  const [component, setComponent] = useState('login')

  return (
    <>
      <Helmet title="DNDPlus | Log in"/>
      <VerticalFlexContainer>
        <VerticalFlexContainer 
          css={{
            width:'70%', 
            alignSelf:'center', 
            backgroundColor:'#f9f9f9', 
            padding:50, 
            borderRadius:20
          }}
        >
          { 
            loggedIn 
              ? "Youre already logged in" 
              : component == 'login' 
                ? <LoginForm swap={ () => setComponent('signup') }/> 
                : <SignupForm swap={ () => setComponent('login') }/>
          }
        </VerticalFlexContainer>
      </VerticalFlexContainer>
    </>
  )
}

export default Login