
import SignupOrLogin from '@components/SignupOrLogin'
import { removeAccessToken, AuthWrapper } from '@components/authentication'
import { useDispatch } from 'react-redux'

import Button from '@components/Button'
import Text from '@components/Text'
import { HorizontalContainer } from '@components/containers'
import { set } from '@components/slices/loginSlice'
import { getBackgroundColour} from "@dnd/theme";

const NavBar = () => {
  const dispatch = useDispatch()

  return (
    <HorizontalContainer 
      style={{ 
        boxShadow:'0px 0px 10px 1px #cccccc',
        //background:`${getBackgroundColour(2)}`, 
        padding:`10px 30px`,
      }}>
        
      <Text style={{fontWeight:'bold'}}>DnD Plus</Text>
      
      <HorizontalContainer style={{ marginLeft: 'auto'}}>
        <AuthWrapper
          childrenWhenUnauthenticated={<SignupOrLogin />}
          children={<Button onClick={() => { removeAccessToken(); dispatch(set(false)) }}>log out</Button>}
        />
      </HorizontalContainer>
    </HorizontalContainer>
  )
  
}


export default NavBar