import './App.css';
import fetch from 'cross-fetch';
import { 
  ApolloClient, 
  ApolloProvider, 
  ApolloLink, 
  HttpLink, 
  InMemoryCache, 
  from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { Provider } from 'react-redux'

import Main from '@dnd/Main';
import store from '@dnd/app/store'
import GlobalStyles from '@dnd/app/GlobalStyle'
import { getAccessToken } from '@components/authentication';


const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log('graphQLErrors', netgraphQLErrorsworkError);
  }
  if (networkError) {
    console.log('networkError', networkError);
  }
});
const httpLink = new HttpLink({
  uri: "http://localhost:8000/graphql",
  fetch
  // Additional options
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const token = getAccessToken();
   
    operation.setContext(({ headers }) => ({
      headers: {
        ...headers,
        authorization: token?`JWT ${token}`:"",
      }
    }))
    
    return forward(operation);
    
})

const client = new ApolloClient({
  link:from([
    authMiddleware,
    errorLink,
    httpLink
  ]),
  
  cache: new InMemoryCache() 
});

function App() {
  return (
    <ApolloProvider client={client}>
      <GlobalStyles/>
      <Provider store={store}>
        <div className="App">  
          <Main/>
        </div>  
      </Provider>
    </ApolloProvider>
  );
}

export default App;
