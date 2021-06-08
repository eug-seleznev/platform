import { useEffect, useRef, useState } from "react";
import { useDispatch, } from "react-redux";
import { changeTaskCard, userToTask } from "../../../../../../redux/actions/kanban";
import { SPRINT_TABLE, TR,Select, SPRINT_TD, NEW_THEAD } from "../../../../../../Styles/tables"
import style from "../../../../../../Styles/modules/components/Project/newsprint.module.css"
import { Thin } from "../../../../../../Styles/typography";
import { Input } from "../../../../../../Styles/Forms";
import { ButtonText } from "../../../../../../Styles/buttons";
import getDate from "../../../../getDate";
import canban from './cardOpen.module.css'

//todo: handle no tasks state


const TaskTable = ({tasksArray, id, team,info}) => {
  let tasks = ['2','3']
  const taskRef = useRef()
  let selectFocusRow = ()=>{
    console.log('hi')
  }
  let  isEdit = false

  const dispatch = useDispatch()

  const [taskId, setTaskId] = useState("");
  const [focusRow, setFocusRow] = useState("");
  const [deadline, setDeadline] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [timeout , updateTimeout] = useState(undefined)
  const [editField, setEditField] = useState(false) 
  const [debounced, setDebouced] = useState('')
  const [isDouble, setDouble] = useState(0)
    const [double, setD] = useState(0);

  useEffect(() => {
    selectFocusRow(focusRow);

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
    <div className={canban.tasks__container} ref={taskRef} style={{overflowY:tasksArray.length>8?'scroll': 'hidden',zIndex:-1, maxHeight:info.emergency === 'Событие'?'22vh':'28vh'}} >
    <SPRINT_TABLE onMouseLeave={() => setTaskId("")} 
      style={{marginTop:'10px',marginLeft:'20px'
    }} >
      <tbody>
        {tasksArray&&tasksArray.map((task,i)=>{
        return (
            <TR
              onMouseOver={() => handleHover(task)}
              onClick={() => doubleClickEdit(task)}
              key={i}
              style={{
                backgroundColor: (task._id === focusRow || task._id === taskId) ? "#F2F2F2" : "white",
                userSelect: 'none'
            }}
            >
            <SPRINT_TD style={{width:'25px'}}>
              <input
                type="checkbox"
                defaultChecked={task.taskStatus}
                name={task._id}
                
                onChange={(e)=>onChange(e,'taskStatus')}
              ></input>
            </SPRINT_TD>



            {editField && task._id === focusRow  ? (
              <SPRINT_TD style={{width:'200px'}}>
                <form onSubmit={enableEdit}>
                  <input
                    className={style.input}
                    type="text"
                    defaultValue={taskTitle}
                    name={task.taskTitle}
                    onClick={(e)=>onFocus(e)}
                    onChange={(e)=>{setDebouced(e.target.value)}}
                  ></input>
                </form>
              </SPRINT_TD>
            ) : (<>
              <SPRINT_TD style={{width:'200px'}}>{task.taskTitle}</SPRINT_TD>

              </> 
            )}
            <SPRINT_TD style={{width:'25%'}}>
              {task.user && team ? (
                
                <>
                  {team && (
                      <Select className={style.select} onChange={(e) => teamHandle(e, task)}>
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
                  {task!==null && taskId === task._id && !task.user && (
                    <Select  defaultValue='Выбрать исполнителя' onChange={(e) => teamHandle(e, task)}>
                      <option> Выбрать исполнителя</option>
                      {team.map((member,i) => {
                        if(member.user!==null)
                        return (
                          <option value={member.user._id}key={i}name={task._id}>
                            {" "}
                            {member.user.fullname}
                          </option>
                        );
                      })}
                    </Select>
                  )}
                </>
              )}
            </SPRINT_TD>
            <SPRINT_TD style={{width:'150px',paddingRight:'25px'}}>
              <div style={{display:task._id===focusRow?'flex':'none'}}>
                <Thin >Дедлайн: </Thin> 
                <ButtonText onClick={()=>setDeadline(true)}
                  style={{display:`${task._id !== focusRow||!deadline?'block':'none'}`}}>
                  {task.deadline!==undefined?getDate(task.deadline):'указать'}
                </ButtonText>
                
                <input onKeyPress={(e)=>e.key==='Enter'? setDeadline(false):''} 
                  type="date" 
                  onChange={(e)=>changeTaskDate(e,task._id)}
                  style={{display:`${task._id === focusRow&&deadline?'block':'none'}`, width:'130px'}}>
                </input>
              </div>
              
            </SPRINT_TD>
            </TR>
        )})}

      
      </tbody>
      
    </SPRINT_TABLE>
    </div>
  );
};



export default TaskTable