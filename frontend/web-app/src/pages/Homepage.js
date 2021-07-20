import React from "react";
import { Link } from "react-router-dom";
import Helmet from "react-helmet"
import {
  VerticalFlexContainer,
  HorizontalFlexContainer,
  CenteredContainer,
  HoverableContainer
} from '@components/containers'
import { RegularText } from "@dnd/components/texts"


const Homepage = () => {
  return (
    <VerticalFlexContainer >
      <Helmet title="Welcome to DNDPlus" />
      <HorizontalFlexContainer style={{ justifyContent: 'space-around' }}>

        <Link to="/create_game" css={{ width: "25%", textDecoration:'none' }}>
          <HoverableContainer
            title="Create">
            <CenteredContainer css={{ padding: 10 }}>
              <RegularText css={{ color: "white" }}>
                Create an adventure for yourself and some friends
              </RegularText>
            </CenteredContainer>
          </HoverableContainer>
        </Link>

        <Link to="/join_game" css={{ width: "25%", textDecoration:'none' }}>
          <HoverableContainer title="Join">
            <CenteredContainer css={{ padding: 10 }}>
              <RegularText css={{ color: "white" }}>
                Join a friends adventure
              </RegularText>
            </CenteredContainer>
          </HoverableContainer>
        </Link>

        <Link to="/create_game" css={{ width: "25%", textDecoration:'none' }}>

          <HoverableContainer title="Build">
            <CenteredContainer css={{ padding: 10 }}>
              <RegularText css={{ color: "white" }}>
                Build items, characters and maps to use in your stories
              </RegularText>
            </CenteredContainer>
          </HoverableContainer>
        </Link>

      </HorizontalFlexContainer>
    </VerticalFlexContainer>
  );
};

export default Homepage;