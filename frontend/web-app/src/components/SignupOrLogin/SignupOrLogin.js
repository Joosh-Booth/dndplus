import { useState } from "react";
import { LoginForm, SignupForm } from "@components/forms";
import Button from '@components/Button';
import { CoupledModal, Modal } from '@components/Modals';


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
          <div>
            <Button style={{marginRight:5}} onClick={() => setModal('LogIn')}>Log In</Button>
            <Button onClick={() => setModal('SignUp')}>Sign up</Button>
          </div>
        }

      />
    </div>
  )

}

export default SignupOrLogin