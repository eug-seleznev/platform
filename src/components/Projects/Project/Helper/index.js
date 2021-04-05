import { Route } from "react-router";
import Project from '../index'
import Header from '../Header'
import Loader from './Loader'

import Sprints from '../Tasks'
import Sprint from '../Tasks/Sprint'
import Models from "../../Models";
import Events from '../Events'
import EditProject from '../Edit'

import Viewer from '../../../Viewer/helper'

import Development from './Development'


const Helper = ({match, history}) => {
  

  let {crypt} = match.params;
    return (
      <div>
        <Loader crypt={match.params.crypt}>
          <Header crypt={crypt} history={history} />
          {/* {'ROUTING FOR PROJECTS'} */}
          <Route exact path={`${match.path}/main`} component={Project} />
          {/* SPRINTS PAGES */}
          <Route exact path={`${match.path}/tasks`} component={Development} />
          <Route
            exact
            path={`${match.path}/tasks/:sprint_id`}
            component={Sprint}
          />

          {/* BIM MODELS ROUTING */}
          <Route exact path={`${match.path}/models`} component={Models} />
          <Route exact path={`${match.path}/models/:name`} component={Viewer} />

          <Route exact path={`${match.path}/edit`} component={EditProject} />
          <Route exact path={`${match.path}/event`} component={Development} />
          <Route exact path={`${match.path}/info`} component={Development} />
        </Loader>
      </div>
    );
} 



export default Helper