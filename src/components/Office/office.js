
import { Route } from "react-router"
import Done from "./newComponents/Done";
import New from "./newComponents/New/index";
import Work from "./newComponents/Work";
import Header from './newComponents/Header'






 const OfficeMain =({match})=>{
    return (
        <div>
            <Header/>
            <Route exact path={`${match.path}/new`} component={New} />
            <Route exact path={`${match.path}/work`} component={Work} />
            <Route exact path={`${match.path}/done`} component={Done} />
        </div>
         

    );
}


export default OfficeMain