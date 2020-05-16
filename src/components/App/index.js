import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
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

export default React.memo(App);
