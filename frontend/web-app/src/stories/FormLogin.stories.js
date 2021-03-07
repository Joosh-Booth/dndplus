import React from 'react';
import { LoginForm }  from '@components/forms';
import { CREATE_USER } from '@components/mutations'
import { MockedProvider } from '@apollo/client/testing'
import { gql } from '@apollo/client';


export default {
  title: 'Components/Forms/Login',
  component: LoginForm,
}


const mocks = [
  {
    request: {
      query: CREATE_USER,
      variables:{input:{username:"qwe",password:"qwe",email:"qwe"}}
    },
    result: {
      data:{
        createUser: {
          __typename:'CreateUserError',
          nonFieldErrors: [],
          fieldErrors: [
            {
              fieldName: "EMAIL",
              errors: [
                "Enter a valid email address."
              ],
              __typename: "CreateUserInvalidField"
            },
            {
              fieldName: "PASSWORD",
              errors: [
                "Ensure this value has at least 8 characters (it has 2)."
              ],
              __typename: "CreateUserInvalidField"
            }
          ]
        }
      },
    },
  },
];


export const LoginFormStory = () => <LoginForm/>




  