import React from "react";

import { VerticalContainer, HorizontalContainer, CenteredContainer } from '@components/containers'

const boxCss = {
  backgroundColor:'white',
  width:'25%',
  height:500,
  borderRadius:25,
  ":hover": {
    boxShadow:'0px 5px 10px 10px #cccccc', 
  },
}
const Homepage = () => {
  return (
    <VerticalContainer >
      <HorizontalContainer style={{justifyContent:'space-around'}}>
        <CenteredContainer 
          css={boxCss}
        >
          Create
        </CenteredContainer>
        <CenteredContainer 
          css={boxCss}
        >
          Join
        </CenteredContainer>
        <CenteredContainer 
          css={boxCss}
        >
          Build
        </CenteredContainer>
      </HorizontalContainer>
    </VerticalContainer>
  );
};

export default Homepage;