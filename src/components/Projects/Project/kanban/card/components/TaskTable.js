import { useEffect, useState } from "react";
import { useDispatch, } from "react-redux";
import { changeTaskCard } from "../../../../../../redux/actions/kanban";
import { SPRINT_TABLE, TR,Select, SPRINT_TD, NEW_THEAD } from "../../../../../../Styles/tables"
import style from "../../../../../../Styles/modules/components/Project/newsprint.module.css"
import { Thin } from "../../../../../../Styles/typography";
import { Input } from "../../../../../../Styles/Forms";
import { ButtonText } from "../../../../../../Styles/buttons";
import getDate from "../../../../getDate";

//todo: handle no tasks state


const TaskTable = ({tasksArray, id}) => {
  let tasks = ['2','3']
  let team = []
  let selectFocusRow = ()=>{
    console.log('hi')
  }
  let  isEdit = false
  let enableEdit = false
  const dispatch = useDispatch()

  const [taskId, setTaskId] = useState("");
  const [focusRow, setFocusRow] = useState("");
  const [deadline, setDeadline] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [timeout , updateTimeout] = useState(undefined)
  const [debounced, setDebouced] = useState('')
  const [isDouble, setDouble] = useState(0)
    const [double, setD] = useState(0);

  useEffect(() => {
    selectFocusRow(focusRow);

  }, [focusRow]);

  const onChange = (e,field) => {
    let id = e.target.name;
    let prop = field==='taskStatus'?e.target.checked:e.target.value
    dispatch(changeTaskCard({field, prop, id }));
  };

  useEffect(() => {
    if (isEdit) {
      let task = tasks.filter((task) => task._id === focusRow);
  
    }
  }, [isEdit]);

  //edit task
  const debounce =(fn,ms)=>{
		const huy=()=> {
				clearTimeout(timeout)
				updateTimeout(setTimeout(fn, ms)) 
		}
		return huy()
	}
	const onTextChange =()=>{
		let value = debounced
		let field = 'taskTitle'
		// console.log(value,id,field)
		// dispatch(EditTask({value, id,focusRow,field}))
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
  const submitEdit = (e) => {
   enableEdit();
  }
  const changeTaskDate =(e)=>{
    let value = e.target.value
    let field = 'deadline'
    // dispatch(EditTask({value, id, focusRow, field}))
    setDeadline(false)
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
    let userid = e.target.value
    let focusRow = task._id
    // dispatch(addUserToTask({userid, id, focusRow }))
  }


  const handleHover = (task) => {

      setTaskId(task._id);
    
  }

  if (!tasks) {
    return <p>Задач нет</p>;
  }

  return (
    <SPRINT_TABLE onMouseLeave={() => setTaskId("")} style={{marginTop:'50px',marginLeft:'20px'}} >
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



            {isEdit && task._id === focusRow  ? (
              <SPRINT_TD style={{width:'50%'}}>
                <form onSubmit={submitEdit}>
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
              <SPRINT_TD style={{maxWidth:'300px'}}>{task.taskTitle}</SPRINT_TD>

              </> 
            )}
            <SPRINT_TD >
              {task.user && team ? (
                
                <>
                  {team && (
                      <Select className={style.select} onChange={(e) => teamHandle(e, task)}>
                      {team.map((member) => {
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
                      {team.map((member) => {
                        if(member.user!==null)
                        return (
                          <option value={member.user._id} name={task._id}>
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
            <SPRINT_TD style={{width:'150px'}}>
              <div style={{display:'flex'}}>
                <Thin >Дедлайн: </Thin> 
                <ButtonText onClick={()=>setDeadline(true)}
                  style={{display:`${task._id !== focusRow||!deadline?'block':'none'}`}}>
                  {task.deadline!==undefined?getDate(task.deadline):'указать'}
                </ButtonText>
                
                <Input onKeyPress={(e)=>e.key==='Enter'? setDeadline(false):''} 
                  type="date" 
                  onChange={(e)=>changeTaskDate(e,task._id)}
                  style={{display:`${task._id === focusRow&&deadline?'block':'none'}`}}>
                </Input>
              </div>
              
            </SPRINT_TD>
            </TR>
        )})}

      
      </tbody>
      
    </SPRINT_TABLE>
  );
};



export default TaskTable