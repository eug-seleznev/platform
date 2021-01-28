import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import "./oneproject.css"

import style from '../../Styles/modules/components/Project/oneproj.module.css'
import { useLocation} from "react-router";
import { addSprint, getProject, allSprints, deleteProject, joinTeam, finishProject} from "../../redux/actions/projects";
import { getTicket } from "../../redux/actions/tikets";
import {Button} from '../../Styles/buttons'
import {  Redirect } from 'react-router-dom';
import { Table, Td, Tr } from "../../Styles/tables";
import { Status } from "../../Styles/project";
import { Container, Card,} from "../../Styles/common";
import { Bold, H1, H3, Light} from '../../Styles/typography'
import SprintDescription from './components/SprintDescrForOneProj'
import ProjTeam from './components/ProjTeam'
import ModalWindow from "./components/ModalWindow";
import Viewer from "./model";
import { Oauth } from "../../redux/actions/models";


// const sprintDays = [];

let months = ['янв','фев',"март","апр","май","июнь","июль","авг","сен","окт","ноя","дек"]
let count = [1,2,3,4]


const Project = ({match, history}) => {
    let {id} = match.params;
    const dispatch = useDispatch();
    const loaded = useSelector(state => state.projects.loadProject);
    const sprintsLoad = useSelector(state => state.projects.loadSprints)
    const user = useSelector(state => state.auth.user) 
    const sprintLoad = useSelector(state => state.projects.sprint_load)
    const reload = useSelector(state => state.projects.reload)
   

    const sprint = useSelector(state => state.projects.sprint)
    const users = useSelector(state => state.users.users)
    const project = useSelector(state => state.projects.project)
    const sprints = useSelector(state => state.projects.sprints)
    const trick = useSelector(state => state.projects.trick)

    const descr = useSelector(state => state.projects.sprints.description)
    const [sprintDays, setSprintDays] = useState([]);
    const [calendLoader, setCalendLoader] = useState (false);
    const [paint, setPaint] = useState(false);
    const [pr, setpr] = useState (false)
    // const project = useSelector(state => state.projects.project.team)
  const [modal, setModal] = useState (false)
  const [sprintId, setSprintId] = useState ('')
    // эт массивы для календаря
    const[conditionalWeeks] =useState([]) 
    const[sprintPaint, setPaintSprint] = useState ([])



    useEffect(() => {

        dispatch(getProject(id));
        


    }, [])
   
    useEffect(() => {
    
    if (loaded && sprintsLoad && trick){
     
    dispatch(Oauth(project.crypt));
      console.log('stage2')
      const Calendar = () => {return new Promise((resolve, reject) =>  {
        
        //  Вот это все короче собирает инфу с бекенда, 
        // режет в нужный мне формат и пушит в массив
        // с отрисовкой пока беда работает ток на f5

         sprints.filter((sprint)=>sprint.dateClosePlan!=null).map ((body, i) => {
          let month = body.dateClosePlan.slice(5,7)
          let day = body.dateClosePlan.slice(8,10)
          let sprintStatusDone = body.tasks.length - body.tasks.filter((task) => !task.taskStatus).length
          let sprintStatusFull = body.tasks.length
          let monthInt = Number(month)
          let dayInt = Number(day)
          setSprintDays(state => [...state, [dayInt,monthInt,sprintStatusDone,sprintStatusFull]])
         })

         
         setCalendLoader(true)
         resolve()
         
      
      })}

      Calendar().then(() =>   setCalendLoader(true)
      )  
    }
    

}, [sprintsLoad, loaded, trick])
        



useEffect(() => {
  console.log(sprintDays, 'new sprintDay')
  console.log(calendLoader, 'CALENDAR LOADER TIME HERE')
}, [calendLoader])

useEffect(() => {
  console.log(sprintPaint, 'my sprint paint here')
}, [sprintPaint])


    useEffect (()=>{  

            if(calendLoader){
              console.log('STAGE 4')
              setpr(false)
              const MapCheck = () =>  new Promise((resolve, reject) => {
                console.log('stage5')
         // вот это цикл для подсчета нужного количества квадратов в календаре и пуша в каждый
         // инфы о месяцах
                for (let i = 0; i <= 47; i++) {
                  if (project.crypt === id){
                    let yu = project.dateStart.slice(5,7)
                    let index = Number(yu)
                    if ((index+i/4) <13){
                      conditionalWeeks.push([i, Math.trunc((i/4)+index),
                        i%4==1?2:
                        i%4==2?3:
                        i%4==3?4:
                        i%4==4?0:1])
                     
                    }
              // елс иф для адекватной отрисовки первого месяца как стартового для проекта  
                    else if (index+i/4>=13){
                      conditionalWeeks.push([i, Math.trunc((i/4)+index-12),
                        i%4==1?2:
                        i%4==2?3:
                        i%4==3?4:
                        i%4==4?0:1])}}
              }


               resolve()
                
                
             
             })


              MapCheck().then(() =>{
              let sprintArray = [];
             
              conditionalWeeks.map ((body, i) => {
                  console.log('stage7')
                 
                    let int = 0
                    //фильтры мапы для показа понедельно квадратиков в нужных местах
                    // инт отвечает за статус/цвет по умолчанию 0=серый
                     sprintDays.filter((sprintday)=>Math.trunc(sprintday[0]/7.75)+1===body[2])
                     .filter((sprintday)=>sprintday[1]===body[1]).filter((sprintday)=>sprintday[2]<sprintday[3]/ 100 * 50)
                     .map (() => {
                       int = 1
                         })

                     sprintDays.filter((sprintday)=>Math.trunc(sprintday[0]/7.75)+1===body[2])
                     .filter((sprintday)=>sprintday[1]===body[1])
                     .filter((sprintday)=>sprintday[2]>=sprintday[3]/ 100 * 50).map (() => { 
                         int = 2
                         })


                     sprintDays.filter((sprintday)=>Math.trunc(sprintday[0]/7.75)+1===body[2])
                       .filter((sprintday)=>sprintday[1]===body[1]).filter((sprintday)=>sprintday[2]===sprintday[3])
                       .map (() => {
                         int = 3
                           })

                      
                        sprintArray.push ([body[0],body[1],body[2],int])  
                         
                        setpr(true)
                           
                 
                      
                                                          
          
                 
                        
                        
                        
               })
               
                setPaintSprint(sprintArray)

                setTimeout(() => {
                  setPaint(true)

                }, 50)
                console.log('stage 8')
              
              } 
              )
            }
         },[calendLoader])
       
    

    useEffect(() => {
        if(loaded){
            dispatch(allSprints(project.crypt))
        }
        // console.log (project)
        // console.log (conditionalWeeks)
        // console.log (sprint)
    }, [loaded])
    
   
      
     const openMod = () => {
          setModal(true)
         
     }
          
            // return history.push(`${id}/${sprint.id}`)
    
    

    //  const createSprint = () => {
        
    //     dispatch(addSprint(project.crypt))

    // }
    const handleEnd = () => {
        
        dispatch(finishProject(id))
        return history.push(`.`)

    }
    const handleDelete = () => {
        dispatch(deleteProject(id))
        return history.push(`./`)

    }
    const offWindow =()=>{
      setModal(false)
    }
    const hadleTeam = () => {
        // console.log (project.team)
        // console.log  (project.msg)
        dispatch(joinTeam(id))
        
    }
   
    return (
      
      <div className={style.grid__container}>
        <div className={style.main}>

        
        {!loaded ? (
          <p> loading...</p>
        ) : (
          <div >
            { !calendLoader? (
              
              <p> loading...</p>
            ) : (
              <>
           <ModalWindow
                      status={modal} 
                      bigTitle={'Создание нового спринта'}
                      smallTitles={['Описание спринта','Продолжительность']}
                      customElements={'CreateSprint'}
                      buttonTitle={'Сохранить'}
                      sprintId={sprintId}
                      offWindow={offWindow}
                    >

                    </ModalWindow>
                  <div className={style.title}>
                    
                    <H1 size='24' >{project.title}</H1>
                    <Bold size='16'>
                      <div className={style.title__small}>
                      
                        <div className={style.title__options} onClick={() => history.replace(`/admin/editproj/${project.crypt}`)}>Настройки</div>
                        <img src='/image 1.png'></img>
                      </div>
                      </Bold>
                  </div>
                  
                  <Light className={style.title__small} size='16'>
                    <div className={style.title__deadline}>Дней до дедлайна: ?</div> 
                    <div className={style.title__deadline}>Стадия: {project.stage}</div>
                  </Light>
                <div>
                  
                  {sprints.length == 0 ? (
                     <Button
                     className={style.special__button}
                      onClick={openMod}
                      style={{
                        color:'black',
                        backgroundColor:'white',
                        fontSize:'20px',
                        fontFamily:'SuisseIntlSemibold',
                      display: `${
                        
                        user.permission === "user" || project.status
                          ? "none"
                          : "block"
                      }`,
                    }}
                  >
                    {" "}
                    {user.permission === "user" ? "" : "Создать спринт"}
                  </Button>
                  ) : (
                   <div className={style.sprintdescr__cont}>
                     {sprints.filter((sprint)=> !sprint.status).map ((sprint, i) => {
                       return (
                         <SprintDescription dateClosePlan={sprint.dateClosePlan} descr={sprint.description} history={history} params={match.params} id={sprint._id} key={i} taskcomplite={sprint.tasks.filter((task) => task.taskStatus).length} 
                         alltasks={sprint.tasks.length} index={i+1}sprintname={sprint.name} dateOpen={sprint.dateOpen}></SprintDescription>
                       )
                     })}
                     <Button
                     className={style.special__button}
                      onClick={openMod}
                      style={{
                        color:'black',
                        backgroundColor:'white',
                        fontSize:'20px',
                        fontFamily:'SuisseIntlSemibold',
                      display: `${
                        
                        user.permission === "user" || project.status
                          ? "none"
                          : "block"
                      }`,
                    }}
                  >
                    {" "}
                    {user.permission === "user" ? "" : "Создать спринт"}
                  </Button>
                   </div>
                  )}
                  
                  <br />
                  
                  <br />
                </div>
                <div className={style.border__calend}></div>
                
                {!paint?<div>loading...</div>:(
                  //календарь со спринтами
                  <> 

                  <div className={style.calend} >
                  <div className={style.calend__title}>Статистика проекта</div>
                  <div className={style.weeks}>
                    {count.map ((body, i) => {
                      
                       return <div key={i} className={style.count}>{i+1}</div>
                     })}
                     {!pr?<div>loading..</div>:(<>
                      {sprintPaint.map ((body, i) => {
                       
                       return <div 
                           style = {{
                             backgroundColor:`${
                             body[3]===1?'red':body[3]===2?'rgba(0,255,0,0.5)':body[3]===3 ?'green':'gray'
                             }`
                           }}
                           key={i} className={style.one__week}>
                             <div className={style.months}> 
                               {body[0]%4===0&&body[1]<=12?months[body[1]-1]: //это отрисовка месяцев
                               body[0]==0?months[1]:
                             ''}</div></div>
                     
                     })}
                     </>)}
                     
                  
                  </div>
                  </div>
                </>)}
                  
                  {/* {sprints.length == 0 ? (
                    <p>Завершенных спринтов нет</p>
                  ) : (
                    <Table>
                      <Tr columns="1fr 1fr 1fr 1fr" top>
                        <Td> Дата </Td>
                        <Td> Название</Td>
                        <Td> Задачи</Td>
                        <Td> Статус</Td>
                      </Tr>

                      {sprints
                        .filter((sprint) => sprint.status)
                        .map((sprint, i) => {
                          return (
                            <Tr
                              columns="1fr 1fr 1fr 1fr"
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
                              <Td>спринт {i}</Td>
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
                  )} */}
            
            <div className={style.border__team}><H1 style={{marginBottom:'10px'}}>Команда</H1></div>
               
                 

                
            <div className={style.sprintdescr__cont}>
                    {project.team.map((user, i) => {
                      return (
                        <ProjTeam  histProp={history} userId={user._id} userName={user.name} userAvatar={user.avatar} userPos={user.position}></ProjTeam>
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
                          style={{
                            
                            fontSize: '16px',
                            left:'auto',
                            right:'60px',
                            color:'black',
                            transform:'translateY(-70px)',
                            position:'absolute',
                            display: `${project.status ? "none" : "block"}`,
                          }}
                        >
                          Выйти из команды проекта
                        </Bold>
                      );
                    } else if (project.team.length - 1 == ind) {
                      return (
                        <Button
                          fontSize={'20px'}
                          onClick={hadleTeam}
                          style={{
                            width: '442px',
                            height: '202px',
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
                    onClick={handleEnd}
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
                  <Button
                    onClick={handleDelete}
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
                  <Viewer />
                </div>
              </>
            )}
          </div>
        )}
        </div>
      </div>
    );
}



export default Project