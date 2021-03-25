import React from "react";
import { Link } from "react-router-dom";
import Helmet from "react-helmet"
import { 
  VerticalFlexContainer,
  HorizontalFlexContainer,
  CenteredContainer,
  HoverableContainer
} from '@components/containers'
import Text from '@components/Text'


const Homepage = () => {
  return (
    <VerticalFlexContainer >
      <Helmet title="Welcome to DNDPlus"/>
      <HorizontalFlexContainer style={{justifyContent:'space-around'}}>

        <Link to="/create_game" css={{width:"25%"}}>
          <HoverableContainer 
            title="Create">
            <CenteredContainer css={{padding:10}}>
              <Text css={{color:"white"}}>
                Create an adventure for yourself and some friends      
              </Text>
            </CenteredContainer>
          </HoverableContainer>
        </Link>
        
        <Link to="/join_game" css={{width:"25%"}}>
          <HoverableContainer title="Join">
            <CenteredContainer css={{padding:10}}>
              <Text css={{color:"white"}}>
                Join a friends adventure      
              </Text>
            </CenteredContainer>
          </HoverableContainer>
        </Link>

        <Link to="/create_game" css={{width:"25%"}}>

        <HoverableContainer title="Build">
          <CenteredContainer css={{padding:10}}>
            <Text css={{color:"white"}}>
              Build items, characters and maps to use in your stories
            </Text>
          </CenteredContainer>
        </HoverableContainer>
        </Link>

      </HorizontalFlexContainer>
    </VerticalFlexContainer>
  );
};

export default Homepage;