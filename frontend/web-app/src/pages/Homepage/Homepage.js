import React from "react";
import { useDispatch } from 'react-redux'

import { getAccessToken, removeAccessToken, AuthWrapper } from '@components/authentication'
import { set } from '@components/slices/loginSlice'
import SignupOrLogin from '@components/SignupOrLogin'

const Homepage = () => {
  const dispatch = useDispatch()
  return (
    <div>
      {getAccessToken()}
      <h1>DND PLUS</h1>
      <AuthWrapper 
        childrenWhenUnauthenticated={<SignupOrLogin />}
      >
        <div onClick={() => { removeAccessToken(); dispatch(set(false)) }}>
          log out
        </div> 
      </AuthWrapper>
      
      <div>
        <AuthWrapper>
          THIS IS AUTHENTICATED
        </AuthWrapper>
      </div>
    </div>
  );
};

export default Homepage;