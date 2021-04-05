import { Route } from "react-router"
import Done from "./Done";
import Loader from "./Loader";
import New from "./New/index";
import Work from "./Work";
import Header from './Header'






const Routing = ({match}) => {
    return (
        <Loader>
          <Header />
          <Route exact path={`${match.path}/new`} component={New} />
          <Route exact path={`${match.path}/work`} component={Work} />
          <Route exact path={`${match.path}/complited`} component={Done} />
        </Loader>
    );
}



export default Routing