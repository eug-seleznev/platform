import { useEffect } from "react"


import { useDispatch, useSelector } from "react-redux";
import { getProject, allSprints, clearSprint} from "../../../redux/actions/projects";


import TitleOfProject from "../components/OneProject/titleOfProject";
import AllSprintsOfProj from "../components/OneProject/allSprintsOfproj";
import CalendSprint from "../components/OneProject/sprintCalend";
import ProjectTeam from "../components/OneProject/ProjectTeam";
import style from '../../../Styles/modules/components/Project/oneproj.module.css'
import Viewer from "../model";
import ProjInfo from "../components/OneProject/projInfo";
import ProjHistory from "../components/OneProject/projHistory";
import { background } from "../../../redux/actions/user";

const Project = ({match, history, location}) => {


  
    let {id} = match.params;
    const dispatch = useDispatch();
    const project = useSelector(state => state.projects.project)
    const sprint = useSelector(state => state.projects.sprint)    



    useEffect(() => {
        dispatch(background('white'))
        return () => {
          dispatch(background('#ECECEC'))
        }
    }, [])



    return (
      <div className={style.contain}>

            <TitleOfProject hist={history} />
            <AllSprintsOfProj status={project.status} id={project.crypt} match={match} hist={history} sprint={sprint} location={location} history={history} sprints={project.sprints}/>
            <ProjectTeam hist={history} id={id} />
            <CalendSprint id={id} hist={history} project={project} />
            <Viewer project={project} />
            <ProjInfo history={history} project={project} />
            <ProjHistory history={history} project={project} />
    
      
      </div>
    );
}





export default Project