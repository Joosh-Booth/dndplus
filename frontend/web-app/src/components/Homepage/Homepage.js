import React from "react";
import { useSelector, useDispatch } from 'react-redux'

import {getAccessToken,setAccessToken} from '@components/authentication'
import Button  from '@components/Button';
import { SignupForm, LoginForm } from '@components/forms';
import { CoupledModal, Modal }  from '@components/Modals';
import { set, selectLogin } from '@components/slices/loginSlice'

const Homepage = () => {
  const login = useSelector(selectLogin)
  const dispatch = useDispatch()

  return (
    <div>
      {getAccessToken()}
      <h1>DND PLUS</h1>
        
    {login  ?
    <div  onClick={()=>{setAccessToken(null); dispatch(set(false))}}>log out</div>:
     <div style={{display:'inline-flex'}}> 
     <div>
       <CoupledModal 
         modalElement={
           <Modal
             body={<SignupForm></SignupForm>}
           />
         }
         element={<Button >Sign up</Button>}

       /> 
     </div>
     
     <div>
       <CoupledModal 
         modalElement={
           <Modal
             body={<LoginForm></LoginForm>}
           />
         }
         element={<Button >Log in</Button>}

       /> 
     </div>
   </div>
    
    }
      


    </div>
  );
};

export default Homepage;