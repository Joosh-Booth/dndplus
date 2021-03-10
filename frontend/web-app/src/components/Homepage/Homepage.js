import React from "react";
import { useSelector, useDispatch } from 'react-redux'

import { getAccessToken, removeAccessToken } from '@components/authentication'
import { set, selectLogin } from '@components/slices/loginSlice'
import { SignupOrLogin } from '@components/SignupOrLogin/SignupOrLogin'

const Homepage = () => {
  const loggedIn = useSelector(selectLogin)
  const dispatch = useDispatch()
  return (
    <div>
      {getAccessToken()}
      <h1>DND PLUS</h1>
      {loggedIn
        ? <div onClick={() => { removeAccessToken(); dispatch(set(false)) }}>
          log out
        </div>
        : <SignupOrLogin />
      }
    </div>
  );
};

export default Homepage;