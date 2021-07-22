import { VerticalFlexContainer } from "@components/containers"
import { RegularText } from "@components/texts"
import { H3 } from "@components/headers"
import DnD from "@images/DnD.bmp"
import styled from "@emotion/styled";
import {css} from "@emotion/react"


export const CampaginItem = ({ data }) => {
  return (
    <>
      <VerticalFlexContainer css={{
        borderRadius: 20,
        textAlign: 'center',
        height: 350,
        width: 300,
        display:'inline-block',
        wordWrap:'break-word',
        [`&:hover ${VerticalFlexContainer}`]:{
          transform: "translate3d(0,-20px,0)",

        }
      }}>
        <VerticalFlexContainer css={{
          borderRadius: 20,

          height: 'inherit',
          width: 'inherit',

          backgroundImage: `url(${DnD})`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',

          WebkitTextStrokeWidth:1,
          WebkitTextStrokeColor:'#000000',
          transition: "box-shadow 450ms ease,transform 350ms ease",
          
          
        }}>
          <H3 
            style={{paddingTop:15, lineHeight:1, color:'aliceblue'}}>My Very Epic Cool Campaign</H3>
        </VerticalFlexContainer>
        <H3>
          Dungeons and Dragons of Doom
          {/* {data.title} */}
        </H3>
      </VerticalFlexContainer>
      <RegularText>
        {/* Time Played */}

      </RegularText>
      <RegularText>
        {/* Type */}
      </RegularText>
      <RegularText>
        {/* Hosted By */}
      </RegularText>
    </>
  )
}