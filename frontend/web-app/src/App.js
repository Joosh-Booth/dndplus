import logo from './logo.svg';
import './App.css';
import Main from './Main';

import { onError } from '@apollo/client/link/error';
import {ApolloClient, ApolloProvider,ApolloLink,HttpLink,InMemoryCache } from '@apollo/client';


const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log('graphQLErrors', graphQLErrors);
  }
  if (networkError) {
    console.log('networkError', networkError);
  }
});
const httpLink = new HttpLink({
  uri: "http://localhost:8000/graphql"
  // Additional options
});
const link = ApolloLink.from([errorLink,httpLink]);

const client = new ApolloClient({
 link:link,
 cache: new InMemoryCache() 
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Main/>
      </div>  
    </ApolloProvider>
  );
}

export default App;
