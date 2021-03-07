import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask, addTasks } from "../../../../redux/actions/projects";
import { Button } from "../../../../Styles/buttons";
import style from "../../../../Styles/modules/components/Project/newsprint.module.css"






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
          {field && <input value={task} className={style.input}  onChange={onChange}></input>}
          <Button style={{backgroundColor:'white',border:'none', color:'#3F496C'}} type="submit"  fontSize="14px" onClick={formHandler}>
            Добавить задачу
          </Button>
        </form>
      </div>
    );
}



export default AddTask