import React from "react";

import { AuthWrapper } from '@components/authentication'
import { VerticalContainer } from '@components/containers'


const Homepage = () => {
  return (
    <VerticalContainer>
      <AuthWrapper>
        THIS IS AUTHENTICATED
      </AuthWrapper>
    </VerticalContainer>
  );
};

export default Homepage;