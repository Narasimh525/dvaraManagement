import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import Login from './Components/Auth/Login';
import Spinner from './Spinner';

import 'semantic-ui-css/semantic.min.css';

// import registerServiceWorker from './registerServiceWorker';

import firebase from './firebaseConnection';

import { BrowserRouter as Router, Switch, Route, withRouter} from 'react-router-dom'

import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension'; 

import rootReducer from './reducers';

import { setUser, setLoader, RemoveLoader, clearUser } from './actions';
const store = createStore( rootReducer, composeWithDevTools());
class Root extends React.Component {

  componentDidMount() {
      firebase.auth().onAuthStateChanged(user => {
          if(user) {
              this.props.setUser(user);
              this.props.history.push('/');
          } else {
              this.props.history.push('/login');
              this.props.clearUser();
          }
      });
  }

  render() {
      return this.props.isLoading ? <Spinner /> :(
          <Switch>
              <Route path = '/' exact component = {App}/>
              <Route path = '/login' exact component = {Login}/>
          </Switch>
      )
  }
}
const mapStateFromProps = state => ({
  isLoading: state.user.isLoading,
});

const RootWithAuth = withRouter(connect(mapStateFromProps, { setUser, setLoader, RemoveLoader, clearUser })(Root));

ReactDOM.render(
  <Provider store = {store}>
    <Router>
      <RootWithAuth />
    </Router>            
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
