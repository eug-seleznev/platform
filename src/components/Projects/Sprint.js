import { useEffect, useState, useRef} from "react"
import { useDispatch, useSelector } from "react-redux"
import { addInfoSprint, addTasks, finishSprint, finishTask, getSprint } from "../../redux/actions/projects";
import { addToChosen } from '../../redux/actions/auth'
import { useForm, FormProvider, useFormContext, useFieldArray, Controller } from "react-hook-form";
import './sprint.css'
import style from '../../Styles/modules/components/Project/oneproj.module.css'
import sprintCss from '../../Styles/modules/components/Project/onesprint.module.css'
import {Button, CancelButton} from '../../Styles/buttons'
import { Table, Td, Tr } from "../../Styles/tables";
import { Container, Card, } from "../../Styles/common";
import { H1, H3, Light, Regular,Bold} from '../../Styles/typography'

const Sprint = ({match, history}) => {
    const dispatch = useDispatch();
    let {id} = match.params;
  
    const chosenSprints = useSelector(state => state.auth.user.sprints)
    let back = match.url;
    const sprint = useSelector(state => state.projects.sprint)
    const taskArr = useSelector(state => state.projects.sprint)
    // const project = useSelector(state => state.projects.project)
    const loading = useSelector(state => state.projects.sprintLoad)
    const msg = useSelector(state => state.projects.msg)
    const user = useSelector(state => state.auth.user)
    const [newFields, setNewFields]= useState(false)
    const [actualClose, setActualClose] = useState (0)
    const [close, setClose] = useState ('??')
    const [diff, setDiff] = useState (0)
    const [loaded, setLoaded] = useState (0)
    const [dateOpenIn, setDateOpenIn] = useState (0)
    const [duration, setDuration] = useState (7)
    const [sprintId,setSprintId] = useState (0)
    const [status, setStatus] = useState (false)
    const { register, control, handleSubmit, reset, watch } = useForm({
        defaultValues: {
            tasks: [{ taskTitle: "задача", workVolume: "5", taskState: false }]
            
          }
    });
    
    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "tasks", // unique name for your Field Array
    });
    
    

  // useEffect(()=>{
  //   console.log(duration)
  // },[duration])
	useEffect (()=> {
    setSprintId(match.params.id)
    // console.log(sprintId, match.params.id)
    if(loading){
      // console.log (sprint)
      setDateOpenIn (sprint.dateOpen)
      if (sprint.dateClosePlan!=null&&sprint.dateClosePlan!=undefined) {
			let d2 = new Date (sprint.dateClosePlan.slice(0, 10).replace(/-/g, "/"))
			
			setActualClose (d2)
		}
		else if(sprint.dateClosePlan==null||sprint.dateClosePlan==undefined) {
			let noData = new Date (sprint.dateOpen.slice(0, 10).replace(/-/g, "/"))
			setActualClose (noData)
		}	
    }
    {chosenSprints.filter(sprint => sprint._id===id).map(()=>{
      setStatus(true)
    })}
	},[loading])
  useEffect (()=> {
     
    if (actualClose!=0){
      let d0 = new Date (sprint.dateOpen.slice(0, 10).replace(/-/g, "/"))
      let d1 = new Date ()
      // console.log(actualClose, d1)
      setDiff (Math.abs(actualClose-d1)/86400000)
      setDuration (Math.abs(actualClose-d0)/86400000)
      if (sprint.dateClosePlan != null) {
        setClose(sprint.dateClosePlan.slice(5,10).replace(/-/g, "."))
      }
      else if (sprint.dateClosePlan == null) {
        setClose('??')
      } 
        setLoaded (true)
      
    }
    
  
},[dateOpenIn])
    //submit for new tasks array;
    const onSubmit = (data) =>{
            let tasks = data;
            dispatch(addTasks({tasks, sprintId }))
           
            setTimeout(() => {
              return history.push(`./`);
          }, 200);
            

    }
//     const prevPage = e => {
//       e.preventDefault();
   
//       setTimeout(() => {
//         return history.replace(`${back.slice(0,14)}`);
// }, 200);
//     }
   
    useEffect(() => {
        
            dispatch(getSprint(id))    
        
    }, [])


 
    const chosenSprint = (e) => {
      setStatus(!status)
      dispatch(addToChosen(id));

     
  }
   
    const onChange = (e) => {
       
    
        let taskid = e.target.value;
        dispatch(finishTask({taskid, id}))
       
    }
    const createField =()=>{
      setNewFields(true)
    }

   const handleSprint = (e) => {
      
        dispatch(finishSprint(id));
        setTimeout(() => {
          return history.push(`./`);
  }, 200);
   }
 

   const prevPage = (e) => {

    
    // //зачем тут таймаут? 
    // setTimeout(() => {
      return history.push(`./`);
    // }, 200);
    
   }

    return (
        <div>
           {!loading ? <p> loading...</p> : (
             <div>
              <div className={style.title} >
                <Bold size='24' >Спринт {sprint.dateOpen.slice(5,10).replace(/-/g, ".")+'-'+
                  close}
                </Bold>  
              </div>
            <Light className={style.title__small} style={{marginBottom:'70px'}} size='16'>
              {!loaded?<div>...</div>:<div className={style.title__deadline}>Дней до дедлайна: {diff.toString().slice(0,1)}</div>}
              <div className={style.title__deadline}></div>
            </Light>
           <div  style={{display:'flex', justifyContent:'space-between',flexWrap:'wrap'}} >
           
            <Card className={sprintCss.first_block} >
              <Regular size='30' style={{marginBottom:'10px'}}>Информация</Regular> 
              <Light style={{paddingBottom:'30px',borderBottom:'1px solid black', marginBottom:'40px'}}>{sprint.description}</Light>
              <div style={{display:'flex',justifyContent:'flex-end'}}>
                <Light>Продолжительность:   </Light> 
                <Regular >{duration==7?'1 неделя':duration==14?'2 недели':'??'}</Regular>
              </div>
              <div style={{display:`${sprint.status?'block':'none'}`}}>
                <Regular size={30} style={{textAlign: 'left',width:'100%', marginTop:'10px', marginBottom:'10px'}}> Задачи </Regular>
                  {taskArr.tasks.map((task, ind) => {
                    return (
                            <div key={ind} >
                              <form>
                                <div style={{display:'flex'}}>
                                  <label style={{display:`${sprint.status?'none':'block'}`}}></label>
                                  <input style={{display:`${sprint.status?'none':'block'}`}} type="checkbox" id="vehicle1" name="vehicle1" defaultChecked={task.taskStatus} value={task._id} onChange={onChange}/>
                                  <Light style={{textAlign:'left', marginLeft:'10px',textDecoration:`${task.taskStatus?'line-through':'none'}`}}>{ind+1}.  {task.taskTitle!==''?task.taskTitle:'Без названия'}</Light>
                                </div>
                              </form>
                            </div>
                            )
                    })}
              </div>          
{/* 
                        {sprint.status && <div>
                            <H1>невыполненные задачи</H1>
                            {taskArr.tasks.filter(task => !task.taskStatus).map((task, ind) => {
                            return (
                              
                                <div key={ind} className="sprint__tasks">
                                    <p></p>
                                    <form>
                                        <div>
                                          
                                            <p>{ind+1}.  {task.taskTitle!==0?task.taskTitle:'Без названия'}</p>
                                            <label></label>
                                            <input type="checkbox" id="vehicle1" name="vehicle1" defaultChecked={task.taskStatus} value={task._id} onChange={onChange}/>

                                        </div>
                                    </form>
                                    
                                </div>
                                 )
                        })}
                          </div>} */}  
                <Button onClick={handleSprint} fontSize={'16px'} style={{display:`${sprint.status?'block':'none'}`,marginTop: '20px',width:'100%'}}> Восстановить спринт</Button>
                <CancelButton onClick={()=>prevPage()} grey style={{display:`${sprint.status?'block':'none'}`,marginTop: '20px'}}>Назад</CancelButton>
            </Card>
            {/* addInfoSprint */}

            <Card className={sprintCss.second_block} style={{opacity: `${sprint.status?0: 1}`,pointerEvents: `${sprint.status?'none': 'auto'}`}}>
            <Regular size={30} style={{textAlign: 'left',width:'100%', marginBottom:'20px'}}> Задачи </Regular>
            {taskArr.tasks.map((task, ind) => {
               return (
                      <div key={ind} >
                        <form>
                          <div style={{display:'flex'}}>
                            <label style={{display:`${sprint.status?'none':'block'}`}}></label>
                            <input style={{display:`${sprint.status?'none':'block'}`}} type="checkbox" id="vehicle1" name="vehicle1" defaultChecked={task.taskStatus} value={task._id} onChange={onChange}/>
                            <Light style={{textAlign:'left', marginLeft:'10px',textDecoration:`${task.taskStatus?'line-through':'none'}`}}>{ind+1}.  {task.taskTitle!==''?task.taskTitle:'Без названия'}</Light>
                          </div>
                        </form>
                      </div>
                      )
              })}
                <form onSubmit={handleSubmit(onSubmit)}>
                  <ul style={{ listStyleType: 'none'}}>
                  <div style={{display:`${newFields?'block':'none'}`}}>
                    {fields.map((item, index) => (
                      <li key={item.id} style= {{display:'flex'}}>
                        <input
                        style={{width:'35vw',height: '20px'}}
                          name={`tasks[${index}].taskTitle`}
                          ref={register()}
                          placeholder="Название задачи" // make sure to set up defaultValue
                        />
                    
                        
                        <Button type="button" style={{display: `${fields.length<=1?'none':'block'}`,color:'#3F496C',
                            backgroundColor:'white',
                            marginRight:'50px', border:'none', marginLeft:'auto', marginRight:'0'}} onClick={() => remove(index)}>Удалить</Button>
                      </li>
                    ))}</div>
                  </ul>
                  <CancelButton
                      fontSize={'16px'}
                      style={{
                              display:`${newFields||user.permission =='user'?'none':'block'}`,
                              color:'#3F496C',
                              backgroundColor:'white',
                              border:'none'}}
                      onClick={createField}>
                    Добавить задачу
                  </CancelButton>
                  <div style={{display:`${newFields?'block':'none'}`}}>
                    <Button
                    fontSize={'16px'}
                      type="button"
                      style={{
                              color:'#3F496C',
                              backgroundColor:'white',
                              border:'none'}}
                      onClick={() => append({ firstName: "appendBill", lastName: "appendLuo" })}>
                      Добавить задачу
                    </Button>
                    <Button 
                    fontSize={'16px'}
                    style={{  marginLeft:'50px',
                              color:'#3F496C',
                              backgroundColor:'white',
                              border:'none'
                    }} type="submit">Сохранить задачи
                    </Button>
                  </div>
                </form>
                <Button fontSize={'16px'} onClick={()=>prevPage()} style={{marginTop:'70px', marginBottom:'10px'}}grey>Вернуться к проекту</Button>
                <Button fontSize={'16px'} style={{marginLeft:'50px', marginBottom:'10px'}} onClick={chosenSprint}>{!status? 'Добавить в избранное': 'Убрать из избранного'}</Button>
                <Button fontSize={'16px'} style={{marginLeft:'50px', marginBottom:'10px',display:`${user.permission=='user'?'none':'block'}`}} onClick={handleSprint}>Завершить спринт</Button>
                
                        
              </Card>
            </div>
         
          </div>)}
        </div>
    )
}

export default Sprint