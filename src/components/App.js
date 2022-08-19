import React from 'react';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Navbar from '../components/Navbar';
import Login from './Login';
import { Container } from 'react-bootstrap';
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import ForgotPassword from './ForgotPassword';
import UpdateProfile from './UpdateProfile';
import ListOfEmployees from '../components/ListOfEmployees';
import Menu from '../components/Menu';
import AddItem from '../components/AddItem';
import ItemsOfTheDay from './ItemsOfTheDay';
import AddItemsOfTheDay from './AddItemsOfTheDay';
import Passbook from './Passbook';

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <div style={{ minHeight: '100vh' }}>
            <Navbar />
            <Container
              className="w-100 d-flex align-items-center justify-content-center"
              style={{ height: 'calc(100vh - 70px)' }}
            >
              <Switch>
                <PrivateRoute exact path="/" component={Dashboard} />
                <PrivateRoute
                  path="/update-profile"
                  component={UpdateProfile}
                />
                <PrivateRoute
                  path="/list-of-employees"
                  component={ListOfEmployees}
                />
                <PrivateRoute path="/menu" component={Menu} />
                <PrivateRoute path="/add-item" component={AddItem} />
                <PrivateRoute path="/passbook" component={Passbook} />
                <PrivateRoute
                  path="/items-of-the-day"
                  component={ItemsOfTheDay}
                />
                <PrivateRoute
                  path="/add-item-of-the-day"
                  component={AddItemsOfTheDay}
                />
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                <Route path="/forgot-password" component={ForgotPassword} />
              </Switch>
            </Container>
          </div>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
