

import {  useSelector } from "react-redux";


import AllBoardsOfProj from "../components/OneProject/allSprintsOfproj";
import ProjectTeam from "../components/OneProject/ProjectTeam";
import style from '../../../Styles/modules/components/Project/oneproj.module.css'
import Viewer from "../model";
import ProjInfo from "../components/OneProject/projInfo";
import ProjHistory from "../components/OneProject/projHistory";
import { useEffect } from "react";

const Project = ({match, history, location}) => {


  
    let {crypt} = match.params;
    const project = useSelector(state => state.projects.project)
    const sprint = useSelector(state => state.projects.sprint)    

  //   useEffect(()=>{
  //     console.log(project)
  // },[])



    return (
      <div className={style.contain}>
        <div className={style.first__col}> 
          <AllBoardsOfProj
            status={project.status}
            crypt={project.crypt}
            match={match}
            hist={history}
            sprint={sprint}
            location={location}
            history={history}
            sprints={project.sprints}
            boards={project.boards}
          />
          {/* <ProjectTeam hist={history} id={crypt} /> */}
          <Viewer project={project} />
        </div>

        <div>
          <ProjInfo history={history} project={project} />
          {/* <ProjHistory history={history} project={project} /> */}
        </div>

        {/* <CalendSprint id={crypt} hist={history} project={project} /> */}
      </div>
    );
}





export default Project