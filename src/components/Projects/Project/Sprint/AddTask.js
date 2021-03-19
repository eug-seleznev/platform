import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask, addTasks, deleteSprint, finishSprint } from "../../../../redux/actions/projects";
import { Button, CancelButton } from "../../../../Styles/buttons";
import style from "../../../../Styles/modules/components/Project/newsprint.module.css"
import Confirm from "../../components/OneProject/confirm";






const AddTask = ({id, user, hist, sprint}) => {
    const dispatch = useDispatch();
    const [field, setField] = useState(false)
    const [open, setOpen] = useState(false)
    const [task, setTask] = useState('');
    const [title, setTitle] = useState('');
    const formHandler = () => {
        setField(true)
    }

    const onChange = (e) => {
        setTask(e.target.value)
    }

    const handleEnd = (e) => {
      
      dispatch(finishSprint(id));
      setTimeout(() => {
        return hist.push(`./`);
    }, 200);
    }
    const openConfirm =()=>{
      setOpen(false)
    }
    
    const handleDelete = () => {
        setTimeout(() => hist.push(`./`), 50);
        dispatch(deleteSprint(id))
     
    
    }
    const openDelite =()=>{
      setOpen(true)
      setTitle('Удалить')
    }
    const openEnd =()=>{
      setOpen(true)
      setTitle(sprint.status?'Восстановить':"Завершить")
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
        <form onSubmit={onSubmit} style={{display:'flex', justifyContent:'space-between'}}>
          {field && <input value={task} className={style.input}  onChange={onChange}></input>}
          <Button style={{backgroundColor:'white',border:'none', color:'#3F496C'}} type="submit"  fontSize="14px" onClick={formHandler}>
            Добавить задачу
          </Button>
          <div style={{display:'flex'}}>
				<CancelButton
                    fontSize={"12px"}
                    style={{
                      display: `${user.permission == "user" ? "none" : "flex"}`,
					  background:'none',
					  color:'#3F496C',
					  border:'none'
                    }}
                    onClick={openDelite}
                  >
                    Удалить спринт
                  </CancelButton>

                  <CancelButton
                  padd='30px'
                    fontSize={"16px"}
                    style={{
                      display: `${user.permission == "user" ? "none" : "flex"}`, border:'none',marginLeft:'20px'
                    }}
                    
                    onClick={openEnd}
                  >
                   
                   {sprint.status?'Восстановить':"Завершить"} спринт
                  </CancelButton>
				</div>
        </form>
        <div style={{display:`${open?'block':'none'}`}}>
          <Confirm type='спринт' buttonTitle={title} handleEnd={handleEnd} handleDelete={handleDelete} openConfirm={openConfirm} title={sprint.title}></Confirm>
        </div>
        
      </div>
    );
}



export default AddTask