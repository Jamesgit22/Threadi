import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Nav from './components/nav/Nav';
import ProfilePage from './components/profile/Profile';
import Home from './components/home/Home';
import './App.css';
import SearchBar from './components/search/Search';
import Login from './components/login/Login';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'your_graphql_api_url',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Nav />
        <BrowserRouter>
          <div className='App'>
            <Switch>
              <Route exact path='/'>
                <Home />
              </Route>
              <Route exact path='/login'>
                <Login />
              </Route>
              <Route path='/profile'>
                <ProfilePage />
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Mallanna&display=swap');
        </style>
      </ApolloProvider>
    </>
  );
}

export default App;
