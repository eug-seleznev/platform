
import { useDispatch, useSelector } from 'react-redux';
import { createBrowserHistory } from "history";

import './App.css';

import Auth from './components/Auth/index'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";
import Layout from './components/Layout';
import { useEffect } from 'react';
import { loadUser } from './redux/actions/auth';

//pages 
import Admin from './components/Adminka/Index';
import DataBase from './components/DataBase';
import Projects from './components/Projects';
import Office from './components/Office/index copy';
import Users from './components/User';
import Dashboard from './components/Adminka/dashboard';
import MyProfile from './components/User/me';
import Employe from './components/User/Employe';
import Edit from './components/User/edit';
import Ticket from './components/Adminka/Ticket';
import Project from './components/Projects/Project';
import Sprint from './components/Projects/Project/Sprint';
import ProjectsEdit from './components/Projects/ProjectsEdit';
import OneProjEdit from './components/Projects/OneProjEdit';
import Main from './components/Main/index'
import Department from './components/Department/index'
import MyProjects from './components/Projects/My';
import News from './components/News';
import {  setAuthToken } from './components/utils/axios';
import Helper from './components/Viewer/helper';


import { Container, LoginContainer } from "../src/Styles/common";



const App = () => {
  const dispatch = useDispatch();
  const history = createBrowserHistory();
  const auth = useSelector(state => state.auth.isAuthenticated)
  const loaded = useSelector(state => state.auth.loaded)


  //chek auth token on render
  useEffect(() => {
    setAuthToken(localStorage.token)
    if(localStorage.token){
      dispatch(loadUser());
    }
  })


  useEffect(() => {
    if (loaded) {

      setAuthToken(localStorage.token)
      setTimeout(() => {
        dispatch(loadUser());
      }, 1000);
    }

   
  }, [loaded])




  return (
    <div className="App">
      {!auth ? (
      <LoginContainer>
          <Auth />
      </LoginContainer>
      ) : (
        <Router history={history}>
          <Layout histCurrent={history} />
          <Switch>
            <Container >
              {/* main */}
              <Route exact path="/" component={Main} />

              {/* сисадминошная */}
              <Route exact path="/help" component={Admin} />
              <Route exact path="/tickets" component={Dashboard} />
              <Route exact path="/tickets/:id" component={Ticket} />

              <Route exact path="/db" component={DataBase} />
              <Route exact path="/office" component={Office} />
              {/* projects */}
              <Route exact path="/projects" component={Projects} />
              <Route exact path="/myprojects" component={MyProjects} />

              <Route exact path="/projects/:id" component={Project} />
              <Route exact path="/projects/:id/:id" component={Sprint} />
              <Switch>
                <Route exact path="/projects/:id/model/test" component={Helper} />
              </Switch>
              <Route exact path="/admin/editproj" component={ProjectsEdit} />
              <Route exact path="/admin/editproj/:id" component={OneProjEdit} />

              {/* users */}
              <Route exact path="/users" component={Users} />
              <Route exact path="/users/me" component={MyProfile} />
              <Route exact path="/users/:id" component={Employe} />
              <Route exact path="/edit" component={Edit} />
              <Route exact path="/news" component={News} />
              <Route exact path="/department" component={Department} />
              <Route exact path="/viewer" component={Helper} />

            </Container>
          </Switch>
        </Router>
      )}
    </div>
  );
}

export default App;
