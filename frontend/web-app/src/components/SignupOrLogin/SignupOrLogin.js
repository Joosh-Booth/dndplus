import { useState } from "react";

import { HorizontalFlexContainer } from '@components/containers'
import { LoginForm, SignupForm } from "@components/forms";
import { CoupledModal, Modal } from '@components/Modals';
import { RegularText } from "@components/texts"


const SignupOrLogin = () => {
  const [openForm, setOpenForm] = useState()

  return (
    <div>
      <CoupledModal
        modalElement={
          <Modal
            body={openForm == 'SignUp' ? <SignupForm swap={() => setOpenForm('LogIn')} /> : <LoginForm swap={() => setOpenForm('SignUp')} />}
          />
        }
        element={
          <HorizontalFlexContainer>
            <RegularText style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={() => setOpenForm('LogIn')}>Log In</RegularText>
            <div css={{ borderLeft: "2px solid #888888", marginRight: 5, marginLeft: 7 }} />
            <RegularText style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={() => setOpenForm('SignUp')}>Sign up</RegularText>
          </HorizontalFlexContainer>
        }

      />
    </div>
  )

}

export default SignupOrLogin