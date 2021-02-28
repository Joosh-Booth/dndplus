import React from "react";

import Button from "@components/Button"
import H1 from "@components/headers"
import Text from "@components/Text"
import TextInput from "@components/inputs/TextInput"
import VerticalContainer from "@components/containers/VerticalContainer"

const SignupForm = () => {
  return (
   
        <VerticalContainer style={{justifyContent:'space-around'}}> 
          <div style={{display:'flex', justifyContent:'space-between'}}>
            <H1 style={{}}>Sign up now</H1> 
            <Text style={{textAlign:'bottom'}}>Log in</Text>
          </div>
          <><Text>Username: </Text> <TextInput/></>
          <><Text>Email: </Text> <TextInput/></>
          <><Text>Password: </Text> <TextInput type="password"/></>
          <><Text>Confirm Password: </Text> <TextInput type="password"/></>
          <div style={{paddingTop:20,display:'flex',justifyContent:'center'}}>
            <Button>submit</Button>
          </div>
        </VerticalContainer>
      
  );
};

export default SignupForm;