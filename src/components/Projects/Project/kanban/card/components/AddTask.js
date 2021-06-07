import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTaskCard } from "../../../../../../redux/actions/kanban";
import { addTask, clearSprint, deleteSprint, finishSprint } from "../../../../../../redux/actions/projects";
import { Button, CancelButton } from "../../../../../../Styles/buttons";
import style from "../../../../../../Styles/modules/components/Project/newsprint.module.css"
import Confirm from "../../../../components/OneProject/confirm";






const AddTask = ({id,proj_id}) => {
 
    const dispatch = useDispatch();
    const [task, setTask] = useState('');

    const onChange = (e) => {
        setTask(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();
            dispatch(addTaskCard(task,id,proj_id));
       setTask("")
        
 
    }
    return (
      <div>
        <form
          onSubmit={onSubmit}
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "95%",
            marginLeft:'20px',
            paddingBottom:'20px',
            borderBottom:'1px solid #AFAFAF'
          }}
        >
          <div style={{
            dispatch: "flex"
          }}>
          
              <input
                value={task}
                className={style.input}
                placeholder="Название задачи..."
                style={{ marginTop: "10px" , border:'none',color:'grey'}}
                onChange={onChange}
              />
            
            <Button
              style={{
                backgroundColor: "white",
                whiteSpace: "nowrap",
                border: "none",
                color: "#3F496C",
                left: "250px",
    
              }}
              type="submit"
              fontSize="14px"
            >
              Добавить
            </Button>
          </div>
        </form>
      </div>
    );
}



export default AddTask