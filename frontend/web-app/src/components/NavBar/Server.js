import { Link } from 'react-router-dom'

import { HorizontalFlexContainer } from '@components/containers'
import { RegularText } from "@dnd/components/texts"


const Server =()=>{
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
      
    </HorizontalFlexContainer>
  )
}

export default Server