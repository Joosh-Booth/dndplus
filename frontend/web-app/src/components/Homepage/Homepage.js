import React from "react";
import { useSelector, useDispatch } from 'react-redux'

import { getAccessToken, removeAccessToken } from '@components/authentication'
import Button from '@components/Button';
import { SignupForm, LoginForm } from '@components/forms';
import { CoupledModal, Modal } from '@components/Modals';
import { set, selectLogin } from '@components/slices/loginSlice'
import { SignupOrLogin } from '@components/SignupOrLogin/SignupOrLogin'

const Homepage = () => {
  const loggedIn = useSelector(selectLogin)
  const dispatch = useDispatch()
  console.log(loggedIn)
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