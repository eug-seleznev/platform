import { useEffect } from "react";
import { Route } from "react-router";
import Header from "./header";
import Office from "./office";
import Platform from "../Roadmap/Routing";
const Ideas = ({match, history}) => {
    
    return (
        <div>
            <Header  history={history}></Header>
            <Route path={`${match.path}/office`} component={Office} />
            <Route path={`${match.path}/platform`} component={Platform} />
        </div>
      );
  } 
  
  
  
  export default Ideas