import React from "react";
import { CoupledModal, Modal }  from '@components/Modals';
import { SignupForm, LoginForm } from '@components/forms';
import Button  from '@components/Button';

const Homepage = () => {
  return (
    <div>
      <h1>DND PLUS</h1>
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
  );
};

export default Homepage;