import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Nav from './components/nav/Nav';
import Profile from './components/profile/Profile';
import Home from './components/home/Home';
import Footer from './components/footer/Footer';
import './App.css';
import Login from './components/login/Login';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache, createHttpLink, } from '@apollo/client';
import Browse from './components/browse/Browse';
import Social from './components/social/Social';
import ThreadsPage from './components/threadspage/ThreadsPage';
import { setContext } from '@apollo/client/link/context';
// import SingleThread from './components/threadspage/singlethread/SingleThread';
import Feed from './components/activityfeed/Feed'
import { HashRouter } from 'react-router-dom/cjs/react-router-dom.min';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Nav />
        <HashRouter>
          <div className='App'>
            <Switch>
              <Route exact path='/' component={Home}>
                <Home />
              </Route>
              <Route exact path='/login' component={Login}>
                <Login />
              </Route>
              <Route exact path='/profile/:username' component={Profile}>
                <Profile />
              </Route>
              <Route path='/threadspage' component={ThreadsPage}>
                <ThreadsPage />
              </Route>
              {/* <Route path='/singlethread'>
                <SingleThread />
              </Route> */}
              <Route path='/browse' component={Browse}> 
                <Browse />
              </Route>
              <Route exact path='/social' component={Social}>
                <Social/>
              </Route>
              <Route path='/feed' component={Feed}>
                <Feed/>
              </Route>
            </Switch>
          </div>
        </HashRouter>
        <Footer />
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Mallanna&display=swap');
        </style>
      </ApolloProvider>
    </>
  );
}

export default App;
