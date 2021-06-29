import { useEffect, useRef, useState } from "react";
import { useDispatch, } from "react-redux";
import { changeTaskCard, userToTask } from "../../../../../../redux/actions/kanban";
import { SPRINT_TABLE, TR,Select, SPRINT_TD, NEW_THEAD } from "../../../../../../Styles/tables"
import style from "../../../../../../Styles/modules/components/Project/newsprint.module.css"
import { Light, Thin } from "../../../../../../Styles/typography";
import { Input } from "../../../../../../Styles/Forms";
import { ButtonText } from "../../../../../../Styles/buttons";
import getDate from "../../../../getDate";
import canban from './cardOpen.module.css'
import TextareaAutosize from "react-autosize-textarea/lib";
import { Path } from "../../../../../Layout/header";
import { useClickOutside } from "../../hooks/hooks";

//todo: handle no tasks state


const TaskTable = ({tasksArray, id, team,info,theme}) => {
  let tasks = ['2','3']
  const taskRef = useRef()
  let selectFocusRow = ()=>{
    
  }
  let  isEdit = false

  const dispatch = useDispatch()
  const outclick = useClickOutside(() =>  setDeadline(false));
  const [taskId, setTaskId] = useState("");
  const [focusRow, setFocusRow] = useState("");
  const [deadline, setDeadline] = useState(false);
  const [editable, setEditable] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [timeout , updateTimeout] = useState(undefined)
  const [editField, setEditField] = useState(false) 
  const [debounced, setDebouced] = useState('')
  const [isDouble, setDouble] = useState(0)
    const [double, setD] = useState(0);

  useEffect(() => {
    selectFocusRow(focusRow);
    setEditable('')
  }, [focusRow]);
  
  useEffect(() => {
    taskRef.current.scrollTo({
        top: taskRef.current.scrollHeight+1000,
        left: 0,
    });
}, [])
  const enableEdit = () => {
    setEditField(!editField)
  }
  const onChange = (e,field) => {
    let id = e.target.name;
    let prop = field==='taskStatus'?e.target.checked:e.target.value
    dispatch(changeTaskCard(prop,id, field));
  };
  const taskScroll =()=>{
    setTimeout(()=>{
      taskRef.current.scrollTo({
            top: taskRef.current.scrollHeight+1000,
            left: 0,
            behavior: 'smooth'
        });
    },200) 
}
  useEffect(() => {
    if (isEdit) {
      let task = tasks.filter((task) => task._id === focusRow);
  
    }
  }, [isEdit]);
  useEffect(() => {
    taskScroll()
  }, [tasksArray]);
  //edit task
  const debounce =(fn,ms)=>{
		const huy=()=> {
				clearTimeout(timeout)
				updateTimeout(setTimeout(fn, ms)) 
		}
		return huy()
	}
	const onTextChange =()=>{
		let prop = debounced
		let field = 'taskTitle'
		let id = focusRow 
		dispatch(changeTaskCard(prop,id, field));
	};
	useEffect(()=>{
		if(debounced!==''){
			debounce(onTextChange,500)
		}
	},[debounced])


  // };
  const onFocus=(e)=>{
    setTaskTitle(e.target.name)
  }
  
  const changeTaskDate =(e)=>{
    let prop = e.target.value
		let field = 'deadline'
		let id = focusRow 
    let date = new Date(e.target.value)
    let year = date.getFullYear()
    if(year>2000) {
      dispatch(changeTaskCard(prop,id,field))
    }
  }

  const doubleClickEdit = (task) => {
      setTaskTitle(task.taskTitle)
      setFocusRow(task._id)
      if(isDouble===0){
          setDouble(1);
          setD(true)
          setTimeout(() => setD(false), 300 )
      }

       if (isDouble === 1 && double) {
         enableEdit();
       } 
       
       if(isDouble===1 && !double) {
         setDouble(0);
       }
      
  }


  const teamHandle = (e, task) => {
    let id = e.target.value
    let task_id = task._id
    dispatch(userToTask(id, task_id))
  }


  const handleHover = (task) => {

      setTaskId(task._id);
    
  }

  if (!tasks) {
    return <p>Задач нет</p>;
  }

  return (
    <div className={canban.tasks__container} ref={taskRef} style={{overflowY:tasksArray.length>4?'scroll': 'hidden',zIndex:-1, maxHeight:'20vh',minHeight:'15vh',marginTop:info.execs?.length===0?'-215px':'-125px'}} >
    <SPRINT_TABLE onMouseLeave={() => setTaskId("")} 
      style={{marginTop:'10px',marginLeft:'20px',marginBottom:'-30px'
    }} >
      <tbody>
        {tasksArray&&tasksArray.map((task,i)=>{
        return (
            <TR
              onMouseOver={() => handleHover(task)}
              onClick={() => doubleClickEdit(task)}
              key={i}
              style={{
                backgroundColor: (task._id === focusRow || task._id === taskId) ? "rgba(0,0,0,0.1)" : !theme ? 'white' : '#1E1E1E',
                userSelect: 'none'
            }}
            >
            <SPRINT_TD style={{width:'2%'}}>
              <input
                type="checkbox"
                defaultChecked={task.taskStatus}
                name={task._id}
                
                onChange={(e)=>onChange(e,'taskStatus')}
              ></input>
            </SPRINT_TD>



            {editField && task._id === focusRow  ? (
              <SPRINT_TD style={{width:'88%'}}>
                <form onSubmit={enableEdit}>
                  <TextareaAutosize
                    maxRows={3}
                    className={style.input}
                    type="text"
                    style={{
                      fontFamily:'SuisseIntlLight',
                      resize:'none',
                      borderRadius:'5px',
                      width:'95%',
                      marginBottom:'-4px',
                      color: theme ? "white" : "black",
                      backgroundColor: !theme ? "white" : "#1E1E1E",
                    }}
                    onKeyPress={(e)=>e.key==='Enter'?setFocusRow(''):''}
                    defaultValue={taskTitle}
                    name={task.taskTitle}
                    onClick={(e)=>onFocus(e)}
                    onChange={(e)=>{setDebouced(e.target.value)}}
                  ></TextareaAutosize>
                </form>
              </SPRINT_TD>
            ) : (<>
              <SPRINT_TD style={{color: theme ? 'white': 'black',marginBottom:'5px',width:'80%'}}>{task.taskTitle}</SPRINT_TD>

              </> 
            )}
            <SPRINT_TD  >
              {task._id === focusRow 
                &&<img src={Path+'three-dots.png'} style={{width:'20px',height:'20px',objectFit:"contain",cursor:'pointer'}} onClick={()=>{setEditable(editable!==task._id?task._id:'')}}/>}
                {editable===task._id &&
                <div style={{position:'relative'}}>
                  <div style={{
                  position:'absolute',
                  width: '195px',
                  height: '45px',
                  marginLeft:'-210px',
                  marginTop:'-35px',
                  borderRadius:'5px',
                  visibility:editable?'visible':'hidden',
                  backgroundColor: !theme ? "white" : "#1E1E1E",
                  border:theme ?'1px solid grey':'1px solid grey'
              }}>
              <div >
              {task.user && team ? (
                
                <>
                  {team && (
                      <Select className={style.select } style={{color: theme ? 'white': 'black', backgroundColor: !theme ?'rgba(0,0,0,0)':'#1E1E1E'}} onChange={(e) => teamHandle(e, task)}>
                      {team.map((member,i) => {
                        if(member.user!==null) {

                            return (
                          <>
                            {task.user._id === member.user._id ? (
                              <option selected value={member.user._id}>
                                {" "}
                                {member.user.fullname}
                              </option>
                            ) : (
                              <option value={member.user._id} name={task._id}>
                                {member.user.fullname}
                              </option>
                            )}
                          </>
                        );
                        }
                      
                      })}
                    </Select>
                    )}
                </>
              ) : (
                <>
                  {task!==null &&  !task.user && (
                    <Select style={{color: theme ? 'white': 'black', backgroundColor: !theme ?'rgba(0,0,0,0)':'#1E1E1E'}} defaultValue='Выбрать исполнителя' onChange={(e) => teamHandle(e, task)}>
                      <option> Выбрать исполнителя</option>
                      {team.map((member,i) => {
                        if(member.user!==null)
                        // console.log(member.user)
                        return (
                          <option value={member.user._id}key={i}name={task._id}>
                            
                            {member.user.fullname}
                          </option>
                        );
                      })}
                    </Select>
                  )}
                </>
              )}
            </div>
            <div style={{width:'150px',paddingRight:'25px'}}>
              <div style={{display:task._id===focusRow?'flex':'none'}}>
                <Light style={{color: theme ? 'white': 'black', backgroundColor: !theme ?'rgba(0,0,0,0)':'#1E1E1E',margin:'5px'}}>Дедлайн: </Light> 
                <ButtonText onClick={()=>setDeadline(true)}
                  style={{display:`${task._id !== focusRow||!deadline?'block':'none'}`,color: theme ? 'white': 'black', backgroundColor: !theme ?'rgba(0,0,0,0)':'#1E1E1E'}}>
                  {task.deadline!==undefined?getDate(task.deadline):'указать'}
                </ButtonText>
                <div style={{overflowX:'hidden'}}>
                    <input ref={outclick} className={style.inputTask} onKeyPress={(e)=>e.key==='Enter'? setDeadline(false):''} 
                      type='datetime-local' 
                      onChange={(e)=>changeTaskDate(e,task._id)}
                      style={{display:`${task._id === focusRow&&deadline?'block':'none'}`, 
                      width:'130px',outline:'none',border:'none',marginLeft:'-110px', color: theme ? 'white': 'black',
                      backgroundColor: !theme ?'white':'#1E1E1E'}}
                    />
                    
                </div>
                
                    
   
              </div>
              
            </div>
                </div>
                
                </div>
                }
            </SPRINT_TD>
            
            </TR>
        )})}

      
      </tbody>
      
    </SPRINT_TABLE>
    </div>
  );
};



export default TaskTable