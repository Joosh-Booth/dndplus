import { useState } from "react";

import { HorizontalFlexContainer } from '@components/containers'
import { LoginForm, SignupForm } from "@components/forms";
import { CoupledModal, Modal } from '@components/Modals';
import { RegularText } from "@dnd/components/texts"


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
            <RegularText style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={() => setModal('LogIn')}>Log In</RegularText>
            <div css={{ borderLeft: "2px solid #888888", marginRight: 5, marginLeft: 7 }} />
            <RegularText style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={() => setModal('SignUp')}>Sign up</RegularText>
          </HorizontalFlexContainer>
        }

      />
    </div>
  )

}

export default SignupOrLogin