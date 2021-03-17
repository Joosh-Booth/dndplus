
import SignupOrLogin from '@components/SignupOrLogin'
import { removeAccessToken, AuthWrapper } from '@components/authentication'
import { useDispatch } from 'react-redux'

import Button from '@components/Button'
import { HorizontalFlexContainer } from '@components/containers'
import { set } from '@components/slices/loginSlice'
import Text from '@components/Text'
import { Link } from 'react-router-dom'

const NavBar = () => {
  const dispatch = useDispatch()

  return (
    <HorizontalFlexContainer 
      style={{ 
        boxShadow:'0px 0px 10px 1px #cccccc',
        padding:`10px 30px`,
        margin:`0px 0px 50px 0px`,
        alignItems:'center'
      }}>

      <Link css={{ textDecoration: 'none' }} to="/">  
        <Text style={{fontWeight:'bold'}}>DnD Plus</Text>
      </Link>
      
      <HorizontalFlexContainer style={{ marginLeft: 'auto'}}>
        <AuthWrapper
          childrenWhenUnauthenticated={<SignupOrLogin />}
          children={
            <Link to="/">
              <Button 
                onClick={() => { removeAccessToken(); dispatch(set(false)) }}
                children={"log out"}
              />
            </Link>
            } //eventually profile
        />
      </HorizontalFlexContainer>
    </HorizontalFlexContainer>
  )
  
}


export default NavBar