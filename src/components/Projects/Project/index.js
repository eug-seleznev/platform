

import {  useSelector } from "react-redux";


import AllSprintsOfProj from "../components/OneProject/allSprintsOfproj";
import CalendSprint from "../components/OneProject/sprintCalend";
import ProjectTeam from "../components/OneProject/ProjectTeam";
import style from '../../../Styles/modules/components/Project/oneproj.module.css'
import Viewer from "../model";
import ProjInfo from "../components/OneProject/projInfo";
import ProjHistory from "../components/OneProject/projHistory";

const Project = ({match, history, location}) => {


  
    let {crypt} = match.params;
    const project = useSelector(state => state.projects.project)
    const sprint = useSelector(state => state.projects.sprint)    





    return (
      <div className={style.contain}>


            <AllSprintsOfProj status={project.status} crypt={project.crypt} match={match} hist={history} sprint={sprint} location={location} history={history} sprints={project.sprints}/>
            <ProjectTeam hist={history} id={crypt} />
            {/* <CalendSprint id={crypt} hist={history} project={project} /> */}
            <Viewer project={project} />
            <ProjInfo history={history} project={project} />
            <ProjHistory history={history} project={project} />
    
      
      </div>
    );
}





export default Project