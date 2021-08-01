import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { removeAccessToken, LoginWrapper } from '@components/authentication'
import { Button } from '@components/buttons'
import { HorizontalFlexContainer } from '@components/containers'
import { setLogin } from '@components/slices/loginSlice'
import SignupOrLogin from '@components/SignupOrLogin'
import { RegularText } from "@dnd/components/texts"
import { getBackgroundColour } from '@dnd/theme'


const Client =()=>{
  const dispatch = useDispatch()
  return (
    <HorizontalFlexContainer 
      style={{ 
        position:'sticky',
        top:0,
        width:'100%',
        boxShadow:'0px 0px 10px 1px #cccccc',
        padding:`10px 30px`,
        margin:`0px 0px 50px 0px`,
        alignItems:'center',
        background:`${getBackgroundColour(2)}`
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