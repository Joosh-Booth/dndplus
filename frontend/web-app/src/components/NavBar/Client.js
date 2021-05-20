import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { removeAccessToken, AuthWrapper } from '@components/authentication'
import Button from '@components/Button'
import { HorizontalFlexContainer } from '@components/containers'
import { set } from '@components/slices/loginSlice'
import SignupOrLogin from '@components/SignupOrLogin'
import { RegularText } from "@dnd/components/texts"


const Client =()=>{
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
        <RegularText style={{fontWeight:'bold'}}>DnD Plus</RegularText>
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

export default Client