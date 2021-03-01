import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addUserToTask, EditTask, finishTask } from "../../../../redux/actions/projects";
import { Sprint_Table } from "../../../../Styles/tables"


//todo: handle no tasks state


const TaskTable = ({ tasks, id, selectFocusRow, isEdit, enableEdit, team }) => {
  const dispatch = useDispatch();
  const [taskId, setTaskId] = useState("");
  const [focusRow, setFocusRow] = useState("");

  const [taskTitle, setTaskTitle] = useState("");

  const [isDouble, setDouble] = useState(0)
    const [double, setD] = useState(0);

  useEffect(() => {
    selectFocusRow(focusRow);
    //todo 
    // disable edit fields
  }, [focusRow]);

  const onChange = (e) => {
    let taskid = e.target.value;
    dispatch(finishTask({ taskid, id }));
  };

  useEffect(() => {
    if (isEdit) {
      let task = tasks.filter((task) => task._id == focusRow);
      console.log(task);
      setTaskTitle(task[0].taskTitle);
    }
  }, [isEdit]);

  //edit task
  const editHandler = (e) => {
   setTaskTitle(e.target.value)
      dispatch(EditTask({ taskTitle, id, focusRow }));
   //server call edit task


  };

  const submitEdit = (e) => {
    e.preventDefault();
    //server call edit task

    dispatch(EditTask({ taskTitle, id, focusRow }));
    enableEdit();
  }


  const doubleClickEdit = (task) => {

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




  const teamHandle = (e, task) => {

    let userid = e.target.value
    let focusRow = task._id
    dispatch(addUserToTask({userid, id, focusRow}))
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
          <tr
            onMouseOver={() => handleHover(task)}
            onClick={() => doubleClickEdit(task)}
            style={{
              backgroundColor: (task._id === focusRow || task._id == taskId) ? "grey" : "white",
            }}
          >
            <td>
              <input
                type="checkbox"
                defaultChecked={task.taskStatus}
                value={task._id}
                onChange={onChange}
              ></input>
            </td>



            {isEdit && task._id === focusRow  ? (
              <td>
                <form onSubmit={submitEdit}>
                  <input
                    type="text"
                    value={taskTitle}
                    onChange={editHandler}
                  ></input>
                </form>
              </td>
            ) : (
              <td>{task.taskTitle}</td>
            )}





            <td>
              {task.user && team ? (
                <>
                  {team && (
                      <select onChange={(e) => teamHandle(e, task)}>
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
                      </select>
                    )}
                </>
              ) : (
                <>
                  {taskId === task._id && !task.user && (
                    <select onChange={(e) => teamHandle(e, task)}>
                      <option selected> Выбрать исполнителя</option>
                      {team.map((member) => {
                        return (
                          <option value={member.user._id} name={task._id}>
                            {" "}
                            {member.user.fullname}
                          </option>
                        );
                      })}
                    </select>
                  )}{" "}
                </>
              )}
            </td>
          </tr>
        );
      })}
    </Sprint_Table>
  );
};



export default TaskTable