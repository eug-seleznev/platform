import style from '../../../../Styles/modules/components/Project/oneproj.module.css'
import { useDispatch, useSelector } from "react-redux";
import {Button} from '../../../../Styles/buttons'
import { Bold, H1} from '../../../../Styles/typography'
import ProjTeam from './oneTeammate'
import { joinTeam } from '../../../../redux/actions/projects';


const ProjectTeam = ({id, hist}) => {
	const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user) 
   	const project = useSelector(state => state.projects.project)

    const hadleTeam = () => {
        dispatch(joinTeam(id))
        
    }
    return (
      <>
	<div className={style.border__team}><H1 style={{marginBottom:'10px'}}>Команда</H1></div>     
                  <div className={style.sprintdescr__cont}>
                          {project.team.map((user, i) => {
                            return (
                              <ProjTeam key={i} histProp={hist} userId={user._id} userName={user.name} lastName={user.lastname} userAvatar={user.avatar} userPos={user.position}></ProjTeam>
                            );
                          })}
                          
                        
                        <br />
                        {project.team.length == 0 && (
                          <Button
                            
                            onClick={hadleTeam}
                            style={{
                              
                              display: `${project.status ? "none" : "block"}`,
                            }}
                          >
                            Вступить в команду проекта
                          </Button>
                        )}
                        {project.team.map((empl, ind) => {
                          // console.log(user, "emp id");
                          if (empl._id === user.id) {
                            // console.log(ind, "INDEX USER");
                            return (
                              <div
                              key={ind}
                                onClick={hadleTeam}
                                className={style.exit}
                                style={{display: `${project.status ? "none" : "flex"}`}}
                              >
                                <Bold style={{textAlign:'center'}}>Выйти </Bold><Bold style={{textAlign:'center'}} className={style.exit_in}>из команды проекта</Bold>
                              </div>
                            );
                          } else if (project.team.length - 1 == ind) {
                            return (
                              <Button
                              key={ind}
                                fontSize={'20px'}
                                onClick={hadleTeam}
                                className={style.team__button}
                                style={{
                                  backgroundColor:'white',
                                  color:'black',
                                  display: `${project.status ? "none" : "block"}`,
                                }}
                              >
                                Вступить в команду проекта
                              </Button>
                            );
                          }
                        })}
                    </div>

	  </>
  
    )
}



export default ProjectTeam
