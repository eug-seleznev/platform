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

import Info from "../Info";
import Kanbans from "../kanban";
import Board from "../kanban/board";


const Helper = ({match, history}) => {
  

  let {crypt} = match.params;
    return (
      <div>
        <Loader crypt={match.params.crypt}>
          <Header crypt={crypt} history={history} />
          {/* {'ROUTING FOR PROJECTS'} */}
          <Route exact path={`${match.path}/main`} component={Project} />
          {/* SPRINTS PAGES */}
          <Route exact path={`${match.path}/tasks`} component={Sprints} />
          <Route exact path={`${match.path}/kanbans`} history={history} component={Kanbans} />
          <Route exact path={`${match.path}/board/:board_name`} component={Board} />
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
          <Route exact path={`${match.path}/info`} component={Info} />
        </Loader>
      </div>
    );
} 



export default Helper