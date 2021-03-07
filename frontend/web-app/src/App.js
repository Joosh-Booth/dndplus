import logo from './logo.svg';
import './App.css';
import Main from './Main';
import { useCookies } from 'react-cookie';
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
  const [cookies, setCookie] = useCookies(['token']);
  
  return (
    <ApolloProvider client={client}>
      <div className="App">
        {cookies.token && <h1>Hello token is there</h1>}
        <Main/>
      </div>  
    </ApolloProvider>
  );
}

export default App;
