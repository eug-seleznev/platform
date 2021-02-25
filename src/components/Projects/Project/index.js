import { useEffect } from "react"


import { useDispatch, useSelector } from "react-redux";
import { Oauth } from "../../../redux/actions/models";
import { getProject, allSprints} from "../../../redux/actions/projects";


import TitleOfProject from "../components/OneProject/titleOfProject";
import AllSprintsOfProj from "../components/OneProject/allSprintsOfproj";
import CalendSprint from "../components/OneProject/sprintCalend";
import ProjectTeam from "../components/OneProject/ProjectTeam";
import DeliteEnd from "../components/OneProject/deliteEnd";
import Viewer from "../model";

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
              <CalendSprint id={id} hist={history} project={project}></CalendSprint>
              <ProjectTeam hist={history} id={id}></ProjectTeam>
              <Viewer project={project} />  
            </>
                )}
        </div>
     
    );
}





export default Project