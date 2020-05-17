import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
//
import DashboardPage from '@/pages/Dashboard';
import ErrorPage from '@/pages/Error';
import Navbar from '@/components/Navbar';
import Overlay from '@/components/Overlay';
import Modal from '@/components/Modal';

const App = () => {
  return (
    <Router>
        <Overlay />
        <Modal />
        <Navbar />
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
