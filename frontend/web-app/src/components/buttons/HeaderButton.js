import { VerticalFlexContainer } from "@components/containers"
import ExpandingBorders from "@components/ExpandingBorders"
import { H4 } from "@components/headers"
import { css } from "@emotion/react"
import { configureStore } from "@reduxjs/toolkit"



const HeaderButton =({title, active=false, onClick=()=>null})=>{
  return(
    <div css={{
      position:'relative',
      transition:'transform .25s ease',
      marginLeft:25,
      marginRight:25,
      backgroundColor:'#1b1b1c',
      cursor:'pointer',
      ':hover': {
        transform:'scale(1.03)'
      },
      height:'min-content',
    }}
    onClick={onClick}
    >
      <H4 style={{padding:'20px 50px'}}>
        {title}
      </H4>
      <ExpandingBorders active={active} top left bottom right/>
    </div>
  )
}

export default HeaderButton