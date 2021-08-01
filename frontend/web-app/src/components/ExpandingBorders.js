

const ExpandingBorders = ({top=false, right=false, bottom=false, left=false}) =>{
  return(
    <div css={{
      position:'absolute', 
      height:"100%", 
      width:"100%", 
      top:0, 
      '&:hover':{
        [`div`]:{
          width:'100%',
          height:'100%',
        }
      },
      [`div`]:{
        position:'absolute',
        margin:'auto', 
        display:'inline-block',
        transition:'transform 100ms ease, width .5s ease, height .5s ease'
      }
    }}>

      {top&&<div css={{
        width:"75%",
        height:'100%',
        borderTop:'1px solid black',  
        top:0,
        left:0,
        right:0, 
      }}/>}

      {bottom&&<div css={{
        width:"75%",
        height:'100%',
        borderBottom:'1px solid black',  
        bottom:0,
        left:0,
        right:0, 
      }}/>}

      {left&&<div css={{
        width:"100%",
        height:'50%', 
        borderLeft:'1px solid black', 
        left:0,
        top:0, 
        bottom:0,
      }}/>}

      {right&&<div css={{
        width:"100%",
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