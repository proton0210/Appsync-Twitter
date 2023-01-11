import { Amplify } from 'aws-amplify';
import React from 'react';
import '@aws-amplify/ui-react/styles.css';
import { useRoutes } from 'react-router';
import routes from './routes';
import { useSelector, useDispatch } from 'react-redux';
import { Auth } from 'aws-amplify';
import { login } from './store';
import { useNavigate } from 'react-router';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';

export default function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loggedIn } = useSelector((state: any) => state.auth);

  const routing = useRoutes(routes(loggedIn));

  return <>{routing}</>;
}
