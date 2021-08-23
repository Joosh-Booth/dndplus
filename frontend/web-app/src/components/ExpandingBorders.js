import styled from "@emotion/styled";
import { getBorderColour } from "@dnd/theme";

const ExpandingBorders = ({
  active=false, 
  top=false, 
  right=false, 
  bottom=false, 
  left=false,
  width="75%",
  height="50%",
  fadeIn=false
}) =>{
  const TopBottom = styled.div({
    opacity:fadeIn&&0,
    position:'absolute',
    margin:'auto', 
    display:'inline-block',
    transition:'width .5s ease, height .5s ease, opacity .1s ease',
    height:"2px",
    width:width,
  })
  
  const LeftRight = styled.div({
    opacity:fadeIn&&0,
    position:'absolute',
    margin:'auto', 
    display:'inline-block',
    transition:'width .5s ease, height .5s ease, opacity .1s ease',
    width:"2px",
    height:height, 
  })

  return(
    <div css={{
      position:'absolute', 
      height:"100%", 
      width:"100%", 
      top:0, 
      [`&:hover ${TopBottom}`]:{
        width: '100%',
        boxShadow: '0px 0px 22px 0px rgba(12,121,204,0.88)',
        opacity:1
      },
      [`&:hover ${LeftRight}`]:{
        height: '100%',
        boxShadow: '0px 0px 22px 0px rgba(12,121,204,0.88)',
        opacity:1
      },
      [`${LeftRight}`]:{
        height: active&&'100%',
        boxShadow:active&&'0px 0px 22px 0px rgba(12,121,204,0.88)',
      },
      [`${TopBottom}`]:{
        width: active&&'100%',
        boxShadow: active&&'0px 0px 22px 0px rgba(12,121,204,0.88)',
      }
    }}
    >
      {top&&<TopBottom css={{borderTop:`1px solid ${getBorderColour(2)}`, top:0, left:0, right:0}}/>}
      {bottom&&<TopBottom css={{borderBottom:`1px solid ${getBorderColour(2)}`, bottom:0, left:0, right:0}}/>}
      {left&&<LeftRight css={{ borderLeft:`1px solid ${getBorderColour(2)}`, left:0, top:0, bottom:0}}/>}
      {right&&<LeftRight css={{ borderRight:`1px solid ${getBorderColour(2)}`, right:0, top:0, bottom:0}}/>}
    </div>
  )
}

export default ExpandingBorders