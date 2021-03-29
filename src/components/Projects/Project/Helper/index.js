import { Route } from "react-router";
import Project from '../index'
import Header from '../Header'
import Loader from './Loader'





const Helper = ({match}) => {
    return (
      <div>
        <Header />

        {/* {'ROUTING FOR PROJECTS'} */}
        <Loader crypt={match.params.crypt}>
          <Route exact path={`${match.path}/main`} component={Project} />
          <Route exact path={`${match.path}/tasks`} component={Project} />
          <Route exact path={`${match.path}/models`} component={Project} />
          <Route exact path={`${match.path}/edit`} component={Project} />
          <Route exact path={`${match.path}/event`} component={Project} />
        </Loader>
      </div>
    );
} 



export default Helper