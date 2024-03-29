import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { removeAccessToken, LoginWrapper } from '@components/authentication'
import { Button } from '@components/buttons'
import { HorizontalFlexContainer } from '@components/containers'
import { setLogin } from '@components/slices/loginSlice'
import SignupOrLogin from '@components/SignupOrLogin'
import { RegularText } from "@components/texts"
import { getBackgroundColour } from '@dnd/theme'


const Client =()=>{
  const dispatch = useDispatch()
  return (
    <HorizontalFlexContainer 
      style={{ 
        position:'sticky',
        top:0,
        width:'100%',
        boxShadow:'0px 0px 10px 0px rgba(12,121,204,0.88)',
        padding:`10px 30px`,
        margin:`0px 0px 50px 0px`,
        alignItems:'center',
        background:`${getBackgroundColour(1)}`,
        zIndex:1
      }}>

      <Link css={{ textDecoration: 'none' }} to="/">  
        <RegularText style={{fontWeight:'bold'}}>DnD Plus</RegularText>
      </Link>
      
      <HorizontalFlexContainer style={{ marginLeft: 'auto'}}>
        <LoginWrapper
          childrenWhenUnauthenticated={<SignupOrLogin />}
          children={
            <Link to="/">
              <Button 
                onClick={() => { removeAccessToken(); dispatch(setLogin(false)) }}
                children={"log out"}
              />
            </Link>
          } //eventually profile
        />
      </HorizontalFlexContainer>
    </HorizontalFlexContainer>
  )
}

export default Client