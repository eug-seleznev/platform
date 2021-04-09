
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
import Docs from './components/Docs/index';
import Admin from './components/Adminka/Index';
import DataBase from './components/DataBase';
import Projects from './components/Projects';
import Office from './components/Office/index';
import Users from './components/User';
import Dashboard from './components/Adminka/dashboard';
import MyProfile from './components/User/me';
import Employe from './components/User/Employe';
import Edit from './components/User/edit';
import Ticket from './components/Adminka/Ticket';
// import ProjectsEdit from './components/Projects/ProjectsEdit';
// import OneProjEdit from './components/Projects/Project/Edit';
import Main from './components/Main/index'
import Department from './components/Department/index'
import MyProjects from './components/Projects/My';
import News from './components/News';
import {  setAuthToken } from './components/utils/axios';
import Helper from './components/Viewer/helper';
import CreateProject from './components/Projects/newProject';
import { Container, LoginContainer } from "../src/Styles/common";
import Contractors from './components/Superadmin/contractors';
import AllDepartments from './components/Department/allDepartments'
import Partition from './components/User/partition';
import PublicViewer from './components/Viewer/publicViewer';
import OneDepartment from './components/Department/oneDepartment'
import EditContractor from './components/Superadmin/editContractor'
//ОТБЕРИТЕ У МЕНЯ КОМПЬЮТЕР НАХУЙ
// import Sprint_New from './components/Projects/Project/Sprint/new'
import Search from './components/User/Search'
import MyTasks from './components/MyTasks/index'
import EditUser from './components/User/editUser';
import ProjectHelper from "./components/Projects/Project/Helper";
import IdeaaHelper from "./components/Roadmap/Routing";
import KPI from './components/KPI';
import DailyUsers from './components/KPI/chart/users';
import { getStat, WeeklyTask } from './redux/actions/stat';


const App = () => {
  const dispatch = useDispatch();
  const history = createBrowserHistory();
  const auth = useSelector(state => state.auth.isAuthenticated)
  const loaded = useSelector(state => state.auth.loaded)
  const background = useSelector(state => state.users.background)
  const style = useSelector(state => state.users.style)
  //chek auth token on render
  useEffect(() => {
    
    setAuthToken(localStorage.token)
    if(localStorage.token){
      dispatch(loadUser());
      dispatch(getStat());
      dispatch(WeeklyTask())

    }
  }, [])


  // useEffect(() => {
  //   if (loaded) {


  //   }
  // }, [loaded])



  return (
    <div className="App" style={{ backgroundColor: 'white' }}>
      <Router history={history}>
        {!auth ? (
          <LoginContainer>
            <Route exact path="/" component={Auth} />
            <Route exact path="/:id/viewer" component={PublicViewer} />
            <Route
              exact
              path="/projects/:crypt/m/view/:name/public"
              component={Helper}
            />
          </LoginContainer>
        ) : (
          <>
            <Layout histCurrent={history} />
            <Switch>
              <Container style={style} background={background}>
                {/* main */}
                <Route exact path="/" component={Main} />

                {/* сисадминошная */}
                <Route exact path="/help" component={Admin} />
                
                <Route exact path="/tickets" component={Dashboard} />
                <Route exact path="/tickets/:id" component={Ticket} />

                <Route exact path="/db" component={DataBase} />
                <Route exact path="/office" component={Office} />
                {/* projects */}
                <Route exact path="/myprojects" component={MyProjects} />
                {/* <Route exact path='/projects/:crypt/:sprint_id/new' component={Sprint_New} /> */}

                <Route exact path="/projects" component={Projects} />


                <Route  path="/projects/:crypt" component={ProjectHelper} />
                
                <Route  path='/idea' component={IdeaaHelper} />

                <Route
                  exact
                  path="/admin/newproject"
                  component={CreateProject}
                />
                {/* users */}
                <Route exact path="/users" component={Users} />
                <Route exact path="/users/me" component={MyProfile} />
                <Route exact path="/users/me/partition" component={Partition} />
                <Route exact path="/docs" component={Docs} />
                <Route exact path="/users/:id" component={Employe} />
                <Route exact path="/users/:id/edit" component={EditUser} />

                <Route exact path="/edit" component={Edit} />
                <Route exact path="/news" component={News} />

                <Route exact path="/mytasks" component={MyTasks}/>
                {/* depatrments */}
                <Route exact path="/department" component={Department} />
                <Route exact path="/departments" component={AllDepartments} />
                <Route
                  exact
                  path="/departments/:id"
                  component={OneDepartment}
                />

                <Route exact path="/:id/viewer" component={PublicViewer} />
                <Route exact path="/search/user" component={Search} />

                <Route exact path="/viewer" component={Helper} />
                <Route exact path="/contractors" component={Contractors} />
                <Route
                  exact path="/contractors/:id"
                  component={EditContractor}
                />


                <Route
                    exact path='/kpi'
                    component={KPI} />
              </Container>
            </Switch>
          </>
        )}
      </Router>

  
    </div>
  );
}

export default App;
