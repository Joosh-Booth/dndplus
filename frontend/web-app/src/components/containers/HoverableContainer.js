import { VerticalFlexContainer, CenteredContainer } from '@components/containers'
import { H1 } from '@components/headers'
import { textOutline } from '@dnd/theme'
import styled from "@emotion/styled";


const HoverableContainer = ({ children, outterCss, title, titleCss, innerCss }) => {

  const ParentContainer = styled.div({
    display: "flex",
    flexDirection: "column",
    backgroundColor: 'white',
    width: '25%',
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
    <ParentContainer>
      <H1
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
      </H1>

      <CenteredContainer
        css={{
          height: '100%',
          width: '100%',
          opacity: 0,
          paddingTop: 55,
          backgroundColor: "transparent",
          borderRadius: 20,
          ":hover": {
            opacity: 100,
            backgroundColor: "rgba(0,0,0,.8)",
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
    </ParentContainer>
  )
}

export default HoverableContainer