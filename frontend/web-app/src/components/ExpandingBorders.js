import styled from "@emotion/styled";


const TopBottom = styled.div({
  position:'absolute',
  margin:'auto', 
  display:'inline-block',
  transition:'transform 100ms ease, width .5s ease, height .5s ease',
  height:"2px"
})

const LeftRight = styled.div({
  position:'absolute',
  margin:'auto', 
  display:'inline-block',
  transition:'transform 100ms ease, width .5s ease, height .5s ease',
  width:"2px"
})

const ExpandingBorders = ({active=false, top=false, right=false, bottom=false, left=false}) =>{
  return(
    <div css={{
      position:'absolute', 
      height:"100%", 
      width:"100%", 
      top:0, 
      [`&:hover ${TopBottom}`]:{
        width: '100%',
        boxShadow: '0px 0px 22px 0px rgba(12,121,204,0.88)'
      },
      [`&:hover ${LeftRight}`]:{
        height: '100%',
        boxShadow: '0px 0px 22px 0px rgba(12,121,204,0.88)'
      },
      [`${LeftRight}`]:{
        height: active&&'100%',
        boxShadow:active&&'0px 0px 22px 0px rgba(12,121,204,0.88)'
      },
      [`${TopBottom}`]:{
        width: active&&'100%',
        boxShadow: active&&'0px 0px 22px 0px rgba(12,121,204,0.88)'
      }
    }}>

      {top&&<TopBottom css={{
        width:"75%",
        borderTop:'1px solid black',  
        top:0,
        left:0,
        right:0, 
      }}/>}

      {bottom&&<TopBottom css={{
        width:"75%",
        borderBottom:'1px solid black',  
        bottom:0,
        left:0,
        right:0, 
      }}/>}

      {left&&<LeftRight css={{
        height:'50%', 
        borderLeft:'1px solid black', 
        left:0,
        top:0, 
        bottom:0,
      }}/>}

      {right&&<LeftRight css={{
        height:'50%',
        borderRight:'1px solid black', 
        right:0,
        top:0, 
        bottom:0,
      }}/>}
    </div>
  )
}

export default ExpandingBorders