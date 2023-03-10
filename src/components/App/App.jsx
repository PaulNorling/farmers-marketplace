import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import NewListing from '../NewListing/NewListing';
import YourListings from '../YourListings/YourListings';
import DetailPage from '../DetailPage/DetailPage';
import EditPage from '../EditPage/EditPage';
import FavoritesPage from '../FavoritesPage/FavoritesPage';
import Search from '../Search/Search';
import './App.css';



function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Header />
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows Search else shows LoginPage
            exact
            path="/search"
          >
            <Search />
          </ProtectedRoute>


          <ProtectedRoute
            // logged in shows NewListing else shows LoginPage
            exact
            path="/newListing"
          >
            <NewListing />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows YourListing else shows LoginPage
            exact
            path="/yourListing"
          >
            <YourListings />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows YourListing else shows LoginPage
            exact
            path="/edit/:id"
          >
            <EditPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows DetailPage else shows LoginPage
            exact
            path="/detail/:id"
          >
            <DetailPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows favoritesPage else shows LoginPage
            exact
            path="/favorites"
          >
            <FavoritesPage />
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
