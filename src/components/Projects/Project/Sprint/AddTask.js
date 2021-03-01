import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask, addTasks } from "../../../../redux/actions/projects";








const AddTask = ({id}) => {
    const dispatch = useDispatch();
    const [field, setField] = useState(false)
    const [task, setTask] = useState('');

    const formHandler = () => {
        setField(true)
    }

    const onChange = (e) => {
        setTask(e.target.value)
    }



    const onSubmit = (e) => {
        e.preventDefault();
        if(field){
            dispatch(addTask({ id, task }));
        }
       setTask("")
        
 
    }
    return (
      <div>
        <form onSubmit={onSubmit}>
          {field && <input value={task}   onChange={onChange}></input>}
          <button  type="submit" color="#3F496C" size="15px" onClick={formHandler}>
            Добавить задачу
          </button>
        </form>
      </div>
    );
}



export default AddTask