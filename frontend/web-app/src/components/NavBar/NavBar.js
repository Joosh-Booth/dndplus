
import SignupOrLogin from '@components/SignupOrLogin'
import { removeAccessToken, AuthWrapper } from '@components/authentication'
import { useDispatch } from 'react-redux'

import Button from '@components/Button'
import { HorizontalContainer } from '@components/containers'
import { set } from '@components/slices/loginSlice'
import Text from '@components/Text'

const NavBar = () => {
  const dispatch = useDispatch()

  return (
    <HorizontalContainer 
      style={{ 
        boxShadow:'0px 0px 10px 1px #cccccc',
        padding:`10px 30px`,
        margin:`0px 0px 50px 0px`,
        alignItems:'center'
      }}>
        
      <Text style={{fontWeight:'bold'}}>DnD Plus</Text>
      
      <HorizontalContainer style={{ marginLeft: 'auto'}}>
        <AuthWrapper
          childrenWhenUnauthenticated={<SignupOrLogin />}
          children={<Button onClick={() => { removeAccessToken(); dispatch(set(false)) }}>log out</Button>} //eventually profile
        />
      </HorizontalContainer>
    </HorizontalContainer>
  )
  
}


export default NavBar