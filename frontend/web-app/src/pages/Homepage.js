import React from "react";
import { Link } from "react-router-dom";
import Helmet from "react-helmet"
import {
  CreateOutlined, 
  PlayArrowOutlined, 
  BuildOutlined
} from '@material-ui/icons';
import {
  VerticalFlexContainer,
  HorizontalFlexContainer,
  HoverableContainer
} from '@components/containers'


const Homepage = () => {
  return (
    <VerticalFlexContainer >
      <Helmet title="Welcome to DNDPlus" />
      <HorizontalFlexContainer style={{ justifyContent: 'space-between', margin:`0px 80px 0px 80px` }}>

        <Link to="/create_game" css={{ width: "33%", textDecoration:'none' }}>
          <HoverableContainer title="Create" text="Create an adventure for yourself and some friends" icon={<CreateOutlined style={{height:'100%', width:'100%'}}/>}/>            
        </Link>

        <Link to="/join_game" css={{ width: "33%", textDecoration:'none'}}>
          <HoverableContainer title="Join" text="Join a friends adventure" icon={<PlayArrowOutlined style={{height:'100%', width:'100%'}}/>}/>
        </Link>

        <Link to="/create_game" css={{ width: "33%", textDecoration:'none' }}>
          <HoverableContainer title="Build" text="Build items, characters and maps to use in your stories" icon={<BuildOutlined style={{height:'100%', width:'100%'}}/>}/>
        </Link>

      </HorizontalFlexContainer>
    </VerticalFlexContainer>
  );
};

export default Homepage;