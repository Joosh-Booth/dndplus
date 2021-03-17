import { useState } from "react";

import { HorizontalFlexContainer } from '@components/containers'
import { LoginForm, SignupForm } from "@components/forms";
import { CoupledModal, Modal } from '@components/Modals';
import Text from '@components/Text'


const SignupOrLogin = () => {
  const [modal, setModal] = useState()

  return (
    <div>
      <CoupledModal
        modalElement={
          <Modal
            body={modal == 'SignUp' ? <SignupForm swap={() => setModal('LogIn')} /> : <LoginForm swap={() => setModal('SignUp')} />}
          />
        }
        element={
          <HorizontalFlexContainer>
            <Text style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={() => setModal('LogIn')}>Log In</Text>
            <div css={{ borderLeft: "2px solid #888888", marginRight: 5, marginLeft: 7 }} />
            <Text style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={() => setModal('SignUp')}>Sign up</Text>
          </HorizontalFlexContainer>
        }

      />
    </div>
  )

}

export default SignupOrLogin