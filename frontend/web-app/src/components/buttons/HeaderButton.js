import { VerticalFlexContainer } from "@components/containers"
import ExpandingBorders from "@components/ExpandingBorders"
import { H2 } from "@components/headers"
import { css } from "@emotion/react"



const HeaderButton =({title})=>{
  return(
    <div css={{
      position:'relative',
      transition:'transform .25s ease',
      ':hover': {
        transform:'scale(1.03)'
      }

    }}>
      <H2 style={{padding:'20px 50px'}}>
        {title}
      </H2>
      <ExpandingBorders left bottom right/>
    </div>
  )
}

export default HeaderButton