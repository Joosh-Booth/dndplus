import React from "react";

import H1 from "@components/headers/H1"
import Text from "@components/Text"
import TextInput from "@components/inputs/TextInput"
import VerticalContainer from "@components/containers/VerticalContainer"

const SignupForm = () => {
  return (
   
        <VerticalContainer> 
          <H1>Sign up now</H1>
          <><Text>Username: </Text> <TextInput/></>
          <><Text>Email: </Text> <TextInput/></>
          <><Text>Password: </Text> <TextInput type="password"/></>
          <><Text>Confirm Password: </Text> <TextInput type="password"/></>
          <div style={{alignSelf:'center', paddingTop:40}}><button>submit</button></div>
        </VerticalContainer>
      
  );
};

export default SignupForm;