import { Icon } from 'react-icons-kit'
import styled from "@emotion/styled";
import { VerticalFlexContainer, CenteredContainer } from '@components/containers'
import ExpandingBorders from '@components/ExpandingBorders';
import { H2 } from '@components/headers'
import { RegularText } from '@components/texts';


const HoverableContainer = ({ outterCss, title, text, icon }) => {

  const ParentContainer = styled.div({
    display: "flex",
    flexDirection: "column",
    backgroundColor: 'white',
    height: 500,
    borderRadius: 20,
    cursor: 'pointer',
    [`:hover ${VerticalFlexContainer}`]: {
      transform: "translate3d(0,0px,0)",
    },
    ":hover": {
      boxShadow:'0px 5px 30px 5px #555555',
      transform: "translate3d(0,-20px,0)",
 
    },
    transition: "box-shadow 450ms ease,transform 350ms ease",

    ...outterCss
  });

  return (
    <VerticalFlexContainer css={{
      height:500,
      borderStyle:'solid',
      textAlign:'center',
      position:'relative',
      alignItems: 'center',
      justifyContent:'space-around',
      border:'1px solid rgba(0,0,0,0)',
      [`&:hover ${H2}`]:{
        transform:'translate3d(0,65%,0);',
        color:'#366eb3'
      },
      [`&:hover ${RegularText}`]:{
        transform:'translate3d(0,-65%,0);',
        color:'#366eb3'
      },
      [`&:hover ${CenteredContainer}`]:{
        color:'#366eb3',
      },
    }}>
      <H2 css={{
        paddingTop:25,
        lineHeight:1,
        transition:'transform 300ms ease, color 250ms ease'
      }}>
        {title}
      </H2>
      <CenteredContainer css={{
        color: "#E4E6F0",
        justifyContent: 'center',
        marginBottom:20, 
        height:'25%',
        width:'25%',
        transition:'color 250ms ease',
      }}>
        <Icon icon={icon} size='100%'/>
      </CenteredContainer>
      <RegularText css={{
        paddingBottom:25,
        transition:'transform 300ms ease, color 250ms ease'
      }}>
        {text}
      </RegularText>
      <ExpandingBorders top bottom left right fadeIn height="25%" width="50%"/>
    </VerticalFlexContainer>
  )
}

export default HoverableContainer

{/* <ParentContainer>
      <H2
        css={{
          textTransform: 'uppercase',
          paddingLeft: 20,
          paddingTop: 20,
          color: 'white',
          textShadow: textOutline,
          position: 'absolute',
          zIndex: 5,
          ...titleCss
        }}
      >
        {title}
      </H2>

      <CenteredContainer
        css={{
          height: '100%',
          width: '100%',
          opacity: 0,
          paddingTop: 70,
          backgroundColor: "transparent",
          borderRadius: 20,
          ":hover": {
            opacity: 100,
            backgroundColor: "rgba(0,0,0,.6)",
          },
          transition: "background-color 450ms ease, opacity 350ms ease",
          ...innerCss
        }}
      >
        <VerticalFlexContainer
          css={{
            transform: "translate3d(0,50px,0)",
            transition: "transform 350ms ease",
          }}
        >
          {children}
        </VerticalFlexContainer>
      </CenteredContainer>
    </ParentContainer> */}