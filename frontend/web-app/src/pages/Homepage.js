import React from "react";
import { Link } from "react-router-dom";
import Helmet from "react-helmet"
import {ic_build_outline} from 'react-icons-kit/md/ic_build_outline'
import {edit} from 'react-icons-kit/feather/edit'
import {play} from 'react-icons-kit/feather/play'

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
          <HoverableContainer title="Create" text="Create an adventure for yourself and some friends" icon={edit}/>            
        </Link>

        <Link to="/join_game" css={{ width: "33%", textDecoration:'none'}}>
          <HoverableContainer title="Join" text="Join a friends adventure" icon={play}/>
        </Link>

        <Link to="/create_game" css={{ width: "33%", textDecoration:'none' }}>
          <HoverableContainer title="Build" text="Build items, characters and maps to use in your stories" icon={ic_build_outline}/>
        </Link>

      </HorizontalFlexContainer>
    </VerticalFlexContainer>
  );
};

export default Homepage;