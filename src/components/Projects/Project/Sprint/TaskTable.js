import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserToTask, EditTask, finishTask } from "../../../../redux/actions/projects";
import { Sprint_Table, TR,Sprint_Td,Select } from "../../../../Styles/tables"
import style from "../../../../Styles/modules/components/Project/newsprint.module.css"
import { Regular, Thin } from "../../../../Styles/typography";
import { Input } from "../../../../Styles/Forms";
import { ButtonText } from "../../../../Styles/buttons";
import getDate from "../../getDate";

//todo: handle no tasks state


const TaskTable = ({ tasks, id, selectFocusRow, focusRowNew, isEdit, enableEdit, team }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)
  const [taskId, setTaskId] = useState("");
  const [focusRow, setFocusRow] = useState("");
  const [deadline, setDeadline] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");

  const [isDouble, setDouble] = useState(0)
    const [double, setD] = useState(0);

  useEffect(() => {
    selectFocusRow(focusRow);
    //todo 
    // disable edit fields
  }, [focusRow]);
  // useEffect(()=>{
  //   if(focusRowNew==='') {
  //     setFocusRow('')
  //     console.log('heyyyyyyyyy')
  //   }
  // },[focusRowNew])
  const onChange = (e) => {
    console.log('change')
    let taskid = e.target.value;
    dispatch(finishTask({ taskid, id }));
  };

  useEffect(() => {
    if (isEdit) {
      let task = tasks.filter((task) => task._id == focusRow);
      console.log(task);
      // setTaskTitle(task[0].taskTitle);
    }
  }, [isEdit]);

  //edit task
  const editHandler = (e) => {
    console.log('edit')
     let field = 'taskTitle'
      let value = e.target.value
      dispatch(EditTask({ value, id, focusRow, field }));
      setTaskTitle(e.target.value)
   //server call edit task


  };
  const onFocus=(e)=>{
    console.log('onFocus')
    setTaskTitle(e.target.name)
  }
  const submitEdit = (e) => {
    e.preventDefault();
    //server call edit task
    let field = 'taskTitle'
    dispatch(EditTask({ taskTitle, id, focusRow, field}));
    enableEdit();
  }
  const changeTaskDate =(e)=>{
    let value = e.target.value
    let field = 'deadline'
    dispatch(EditTask({value, id, focusRow, field}))
  }

  const doubleClickEdit = (task) => {
      setTaskTitle(task.taskTitle)
      setFocusRow(task._id)
      if(isDouble==0){
          setDouble(1);
          setD(true)
          setTimeout(() => setD(false), 300 )
      }

       if (isDouble == 1 && double) {
         enableEdit();
       } 
       
       if(isDouble==1 && !double) {
         setDouble(0);
       }
      
  }


  // useEffect(()=>{
  //   if(taskId=='') {
  //     setFocusRow('')
  //   }
  // },[taskId])

  const teamHandle = (e, task) => {

    let userid = e.target.value
    let focusRow = task._id
    dispatch(addUserToTask({userid, id, focusRow }))
  }


  const handleHover = (task) => {

      setTaskId(task._id);
    
  }

  if (!tasks) {
    return <p>Задач нет</p>;
  }

  return (
    <Sprint_Table onMouseLeave={() => setTaskId("")}>
      {tasks.map((task) => {
        
        return (
          <TR
            onMouseOver={() => handleHover(task)}
            onClick={() => doubleClickEdit(task)}
            
            style={{
              backgroundColor: (task._id === focusRow || task._id == taskId) ? "#F2F2F2" : "white",
              userSelect: 'none'
            }}
          >
            <Sprint_Td style={{width:'25px'}}>
              <input
              
                type="checkbox"
                defaultChecked={task.taskStatus}
                value={task._id}
                onChange={onChange}
              ></input>
            </Sprint_Td>
           


            {isEdit && task._id === focusRow  ? (
              <Sprint_Td style={{width:'50%'}}>
                <form onSubmit={submitEdit}>
                  <input
                  className={style.input}
                    type="text"
                    value={taskTitle}
                    name={task.taskTitle}
                    onClick={(e)=>onFocus(e)}
                    onChange={(e)=>editHandler(e)}
                  ></input>
                </form>
              </Sprint_Td>
            ) : (<>
              <Sprint_Td>{task.taskTitle}</Sprint_Td>
              
              </>
              
            )}

            



            <Sprint_Td >
              {task.user && team ? (
               
                <>
                  {team && (
                      <Select className={style.select} onChange={(e) => teamHandle(e, task)}>
                      {team.map((member) => {
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
                      })}
                    </Select>
                    )}
                </>
              ) : (
                <>
                  {taskId === task._id && !task.user && (
                    <Select className={style.select}  defaultValue='Выбрать исполнителя' onChange={(e) => teamHandle(e, task)}>
                      <option> Выбрать исполнителя</option>
                      {team.map((member) => {
                        return (
                          <option value={member.user._id} name={task._id}>
                            {" "}
                            {member.user.fullname}
                          </option>
                        );
                      })}
                    </Select>
                  )}{" "}
                </>
              )}
            </Sprint_Td>
            <Sprint_Td style={{width:'250px'}}>
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
              
            </Sprint_Td>
          </TR>
        );
      })}
    </Sprint_Table>
  );
};



export default TaskTable