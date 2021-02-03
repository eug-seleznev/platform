import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import "./oneproject.css"

import style from '../../Styles/modules/components/Project/oneproj.module.css'

import { getProject, allSprints, deleteProject, joinTeam, finishProject} from "../../redux/actions/projects";

import {Button, CancelButton} from '../../Styles/buttons'

import { Table, Td, Tr } from "../../Styles/tables";
import { Status } from "../../Styles/project";
import {ModalContainer, ModalWind,} from "../../Styles/common";
import { Bold, H1, H3, Light} from '../../Styles/typography'
import SprintDescription from './components/SprintDescrForOneProj'
import ProjTeam from './components/ProjTeam'
import ModalWindow from "./components/ModalWindow";

import { Oauth } from "../../redux/actions/models";
import Confirm from "./confirm";
import TitleOfProject from "./components/OneProject/titleOfProject";
import AllSprintsOfProj from "./components/OneProject/allSprintsOfproj";
import CalendSprint from "./components/OneProject/sprintCalend";


// const sprintDays = [];

let months = ['янв','фев',"мар","апр","май","июн","июл","авг","сен","окт","ноя","дек"]
let count = [1,2,3,4]


const Project = ({match, history}) => {
    let {id} = match.params;
    const dispatch = useDispatch();
    const loaded = useSelector(state => state.projects.loadProject);
    const sprintsLoad = useSelector(state => state.projects.loadSprints)
    const user = useSelector(state => state.auth.user) 

    const project = useSelector(state => state.projects.project)
    const sprints = useSelector(state => state.projects.sprints)
    const trick = useSelector(state => state.projects.trick)

    const [status, setStatus] = useState (false)
    const [sprintDays, setSprintDays] = useState([]);
    const [calendLoader, setCalendLoader] = useState (false);
    const [paint, setPaint] = useState(false);
    const [pr, setpr] = useState (false) 
    const [confirm, setConfirm] = useState (false)
    const [buttonTitle, setButtonTitle] = useState ('')
    // const project = useSelector(state => state.projects.project.team)
  const [modal, setModal] = useState (false)
  
    // эт массивы для календаря
    const[conditionalWeeks] =useState([]) 
    const[sprintPaint, setPaintSprint] = useState ([])



    useEffect(() => {

        dispatch(getProject(id));
        
        

    }, [])
   
    useEffect(() => {
    
    if (loaded && sprintsLoad && trick){
     
    dispatch(Oauth(project.crypt));
      // console.log('stage2')
         setCalendLoader(true)
      
    }
   
}, [sprintsLoad, loaded, trick])
        



// useEffect(() => {
//   console.log(sprintDays, 'new sprintDay')
//   console.log(calendLoader, 'CALENDAR LOADER TIME HERE')
// }, [calendLoader])

// useEffect(() => {
//   console.log(sprintPaint, 'my sprint paint here')
// }, [sprintPaint])

    useEffect (()=>{  

            if(calendLoader){
              // console.log('STAGE 4')
              setpr(false)
            
             }})

             
       
    

    useEffect(() => {
        if(loaded){
            dispatch(allSprints(project.crypt))
        }
        console.log (project)
        // console.log (conditionalWeeks)
        // console.log (sprint)
    }, [loaded])
    
   
    const openModHistory = () => {
      setStatus(!status)
     
 }
  

    const handleEnd = () => {
        
        dispatch(finishProject(id))

        openConfirmEnd()
        return history.push(`./`)

    }
    const openConfirmEnd = ()=>{
      setButtonTitle('Завершить')
      setConfirm (!confirm)
    }
    const openConfirm = ()=>{
      setButtonTitle('Удалить')
      setConfirm (!confirm)
    }
    const handleDelete = () => {
        dispatch(deleteProject(id))
        openConfirm()
        return history.push(`./`)

    }
    const offWindow =()=>{
      setModal(false)
    }
    const hadleTeam = () => {
        dispatch(joinTeam(id))
        
    }
 
    return (
      
  
        <div>

        
        {!loaded ? (
          <p> loading...</p>
        ) : (
          <div >
            { !calendLoader? (
              
              <p> loading...</p>
            ) : (
              
              <>
          
                <TitleOfProject hist={history}></TitleOfProject>
                <AllSprintsOfProj match={match} hist={history}></AllSprintsOfProj>
                <CalendSprint id={id} project={project}></CalendSprint>
                 
                      <ModalContainer style={{display:`${!status?'none':'block'}`}}>
                        <ModalWind>
                        {sprints.length == 0 ? (
                          <p>Завершенных спринтов нет</p>
                        ) : (
                          <Table>
                            <Tr columns="1fr 1fr 1fr" top>
                              <Td> Дата </Td>
                              
                              <Td> Задачи</Td>
                              <Td style={{textAlign:'center'}}> Статус</Td>
                            </Tr>

                            {sprints
                              .filter((sprint) => sprint.status)
                              .map((sprint, i) => {
                                return (
                                  <Tr
                                    columns="1fr 1fr 1fr "
                                    key={i}
                                    title="Открыть спринт"
                                    onClick={() =>
                                      history.push(`/projects/${id}/${sprint._id}`)
                                    }
                                  >
                                    <Td>
                                      {" "}
                                      {sprint.dateOpen
                                        .slice(0, 16)
                                        .replace(/T/g, "  ")}
                                    </Td>
                                    
                                    <Td>
                                      {" "}
                                      {
                                        sprint.tasks.filter((task) => task.taskStatus)
                                          .length
                                      }
                                      /{sprint.tasks.length}
                                    </Td>
                                    <Td>
                                      {sprint.tasks.length -
                                        sprint.tasks.filter((task) => task.taskStatus)
                                          .length ===
                                      0 ? (
                                        <Status green />
                                      ) : (
                                        <Status red />
                                      )}
                                    </Td>
                                  </Tr>
                                );
                              })}
                          </Table>
                        )}
                        <CancelButton padd={'55px'}grey onClick={openModHistory}>Закрыть</CancelButton>
                        </ModalWind>
                  </ModalContainer>
      
                
            <div className={style.border__team}><H1 style={{marginBottom:'10px'}}>Команда</H1></div>
               
                 

                
            <div className={style.sprintdescr__cont}>
                    {project.team.map((user, i) => {
                      return (
                        <ProjTeam  histProp={history} userId={user._id} userName={user.name} lastName={user.lastname} userAvatar={user.avatar} userPos={user.position}></ProjTeam>
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
                        <Bold
                          onClick={hadleTeam}
                          className={style.exit}
                          style={{display: `${project.status ? "none" : "flex"}`}}
                        >
                          <p>Выйти </p><p className={style.exit_in}>из команды проекта</p>
                        </Bold>
                      );
                    } else if (project.team.length - 1 == ind) {
                      return (
                        <Button
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

                <div style={{marginTop:'30px'}}>
                  <Button
                    onClick={openConfirmEnd}
                    style={{
                      display: `${
                        user.permission === "user" ? "none" : "block"
                      }`,
                      marginBottom: "30px",
                    }}
                  >
                    {" "}
                    {user.permission === "user"
                      ? ""
                      : project.status
                      ? "Восстановить проект"
                      : "Завершить проект"}
                  </Button>
                  <div style={{display:`${confirm?'block':'none'}`}}><Confirm buttonTitle={buttonTitle} handleEnd={handleEnd} handleDelete={handleDelete} openConfirm={openConfirm} title={project.title}></Confirm></div>
                  <Button
                    onClick={openConfirm}
                    style={{
                      display: `${
                        user.permission === "user" ? "none" : "block"
                      }`,
                      marginBottom: "30px",
                    }}
                  >
                    {" "}
                    {user.permission === "user" ? "" : "Удалить проект"}
                  </Button>
                </div>

                <div>
                  {/* <Viewer /> */}
                </div>
              </>
            )}
          </div>
        )}
        </div>
     
    );
}



export default Project