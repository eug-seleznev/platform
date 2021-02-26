import { useEffect } from "react"


import { useDispatch, useSelector } from "react-redux";
import { Oauth } from "../../../redux/actions/models";
import { getProject, allSprints} from "../../../redux/actions/projects";


import TitleOfProject from "../components/OneProject/titleOfProject";
import AllSprintsOfProj from "../components/OneProject/allSprintsOfproj";
import CalendSprint from "../components/OneProject/sprintCalend";
import ProjectTeam from "../components/OneProject/ProjectTeam";

import Viewer from "../model";
import ProjInfo from "../components/OneProject/projInfo";

const Project = ({match, history}) => {


  
    let {id} = match.params;
    const dispatch = useDispatch();
    const loaded = useSelector(state => state.projects.loadProject)
    const project = useSelector(state => state.projects.project)

  


    useEffect(() => {
        dispatch(getProject(id));
     
    }, [])

    useEffect(() => {
        if(loaded){
            dispatch(allSprints(project.crypt))
            // dispatch(Oauth(project.crypt)); //3d viewer  oauth token
        }
    }, [loaded])
    return (
        <div>
          {!loaded ? (
            <p> loading...</p>

          ) : (
            <>
              <TitleOfProject hist={history}></TitleOfProject>
              <AllSprintsOfProj status={project.status} match={match} hist={history}></AllSprintsOfProj>
              <div style={{width:'100%', display:'flex'}}>
                <div style={{width:'100%'}}>
                  <ProjectTeam hist={history} id={id}></ProjectTeam>
                  <CalendSprint id={id} hist={history} project={project}></CalendSprint>
                  <Viewer project={project} />
                </div>
                <ProjInfo></ProjInfo>
              </div> 
            </>
                )}
        </div>
     
    );
}





export default Project