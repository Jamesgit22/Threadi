import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Nav from './components/nav/Nav';
import Profile from './components/profile/Profile';
import Home from './components/home/Home';
import Footer from './components/footer/Footer';
import './App.css';
import Login from './components/login/Login';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import Browse from './components/browse/Browse';
import Social from './components/social/Social';
import ThreadsPage from './components/threadspage/ThreadsPage';

const client = new ApolloClient({
  uri: 'graphql',
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
              <Route path='/profile/:username'>
                <Profile />
              </Route>
              <Route path='/threadspage'>
                <ThreadsPage />
              </Route>
              <Route path='/browse'>
                <Browse />
              </Route>
              <Route>
                <Social path='social'/>
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
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
