import { Link } from 'react-router-dom'

import { HorizontalFlexContainer } from '@components/containers'
import { RegularText } from "@components/texts"
import { getBackgroundColour } from '@dnd/theme'


const Server =()=>{
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
        background:`${getBackgroundColour(1)}`
      }}>

      <Link css={{ textDecoration: 'none' }} to="/">  
        <RegularText style={{fontWeight:'bold'}}>DnD Plus</RegularText>
      </Link>
      
    </HorizontalFlexContainer>
  )
}

export default Server