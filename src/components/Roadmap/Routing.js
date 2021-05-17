import { Route } from "react-router"
import Done from "./Done";
import Loader from "./Loader";
import New from "./New/index";
import Work from "./Work";
import Header from './Header'
 import Dashboard from './Dashboard'





const Routing = ({match}) => {
    return (
        <Loader>
          <Header />
          <Route exact path={`${match.path}/new`} component={New} />
          <Route exact path={`${match.path}/work`} component={Work} />
          <Route exact path={`${match.path}/done`} component={Done} />
          <Route exact path={`${match.path}/dashboard`} component={Dashboard} />
        </Loader>
    );
}



export default Routing