import { gql } from '@apollo/client';

export const IS_ALLOWED_ON_PAGE = gql`
  query IsAllowedOnPage($input: PageInput!){
    isAllowedOnPage(input: $input)
  }
`;