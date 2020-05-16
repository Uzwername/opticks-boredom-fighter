import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { connect } from 'react-redux';
import overlay from '@/redux/slices/overlay';
//
import DashboardPage from '@/pages/Dashboard';
import ErrorPage from '@/pages/Error';

const App = ({ dispatch }) => {
  return (
    <Router>
        <nav>
            <Link to="/">Home</Link>
            <br />
            <Link to="/about/">About</Link>
            <br />
            <button
                onClick={() => {
                    dispatch(overlay.actions.show())
                    setTimeout(
                        () => dispatch(overlay.actions.hide()), 
                        3000
                    )
                }}
            >
                Show Overlay 3 seconds
            </button>
        </nav>
        <Switch>
            <Route exact path="/">
                 <DashboardPage />
            </Route>
            <Route path="/about/">
                <h1>About us!</h1>
            </Route>
            <Route path="*">
                <ErrorPage
                    title="404"
                    message="Page not found"
                />
            </Route>
        </Switch>
    </Router>
  );
}

export default connect()(App);
