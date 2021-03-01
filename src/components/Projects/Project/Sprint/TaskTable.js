import { useState } from "react";
import { useDispatch } from "react-redux";
import { finishTask } from "../../../../redux/actions/projects";
import { Sprint_Table } from "../../../../Styles/tables"


//todo: handle no tasks state


const TaskTable = ({tasks, id}) => {
    const dispatch = useDispatch();
    const [taskId, setTaskId] = useState('')
    if (!tasks) {
        return <p>Задач нет</p>;
    }
    
    const onChange = (e) => {
      let taskid = e.target.value;
      dispatch(finishTask({ taskid, id }));
    };


   
    return (
      <Sprint_Table onMouseLeave={() => setTaskId("")}>
        {tasks.map(task => {
          return (
            <tr onMouseOver={() => setTaskId(task._id)}>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={task.taskStatus}
                  value={task._id}
                  onChange={onChange}
                ></input>
              </td>

              <td>{task.taskTitle}</td>

              <td>{taskId == task._id && <p>choose user</p>} </td>
            </tr>
          );
        })}
      </Sprint_Table>
    );
}



export default TaskTable