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

const Helper = ({match, history}) => {

  let value_from_back = '25-15-10'
  let settings = {
    settings: true,
    hello: false
  };

  let obj = {};

  obj[value_from_back] = settings;

  console.log(obj);

  let {crypt} = match.params;
    return (
      <div>
        <Header crypt={crypt} history={history} />

        <Loader crypt={match.params.crypt}>
          {/* {'ROUTING FOR PROJECTS'} */}
          <Route exact path={`${match.path}/main`} component={Project} />
          {/* SPRINTS PAGES */}
          <Route exact path={`${match.path}/tasks`} component={Sprints} />
          <Route
            exact
            path={`${match.path}/tasks/:sprint_id`}
            component={Sprint}
          />

          {/* BIM MODELS ROUTING */}
          <Route exact path={`${match.path}/models`} component={Models} />
          <Route exact path={`${match.path}/models/:name`} component={Viewer} />

          <Route exact path={`${match.path}/edit`} component={EditProject} />
          <Route exact path={`${match.path}/event`} component={Events} />
        </Loader>
      </div>
    );
} 



export default Helper