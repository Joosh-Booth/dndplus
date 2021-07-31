import React from 'react';

import { Button } from '@components/buttons';
import { CoupledModal, Modal }  from '@components/Modals';
import SignupForm from '@components/forms/SignupForm';


export default {
  title: 'Components/Modals/CoupledModal',
  component: CoupledModal,
}

export const CoupledModalStory = () =>
  <CoupledModal 
    modalElement={
      <Modal
        body={<SignupForm></SignupForm>}
      />
    }
    element={<Button >Sign up</Button>}

  /> 
  
