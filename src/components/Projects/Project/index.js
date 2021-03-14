import { useEffect } from "react"


import { useDispatch, useSelector } from "react-redux";
import { getProject, allSprints} from "../../../redux/actions/projects";


import TitleOfProject from "../components/OneProject/titleOfProject";
import AllSprintsOfProj from "../components/OneProject/allSprintsOfproj";
import CalendSprint from "../components/OneProject/sprintCalend";
import ProjectTeam from "../components/OneProject/ProjectTeam";
import style from '../../../Styles/modules/components/Project/oneproj.module.css'
import Viewer from "../model";
import ProjInfo from "../components/OneProject/projInfo";
import ProjHistory from "../components/OneProject/projHistory";

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
        }
    }, [loaded])
    return (
      <div className={style.contain}>
        {!loaded ? (
          <p> loading...</p>
        ) : (
          <>
            <TitleOfProject hist={history} />
            <AllSprintsOfProj status={project.status} id={project.crypt} match={match} hist={history}/>
            <ProjectTeam hist={history} id={id} />
            <CalendSprint id={id} hist={history} project={project} />
            <Viewer project={project} />
            <ProjInfo history={history} project={project} />
            <ProjHistory history={history} project={project} />
              
          </>
        )}
      </div>
    );
}





export default Project