import { useEffect, useState } from "react"
import style from "../../Styles/modules/main/mytasks.module.css"
import newsp from "../../Styles/modules/components/Project/newsprint.module.css"
import { NEW_TABLE, NEW_TBODY, NEW_TD, NEW_TH, NEW_THEAD, NEW_TR } from "../../Styles/tables"
import { ButtonTextDiv} from "../../Styles/buttons"
import getDate from "../Projects/getDate"
import { useDispatch} from "react-redux"
import { addUserTask, editUserTask } from "../../redux/actions/user"

const MyTasks =({tasks, history,onChange})=>{
	const dispatch = useDispatch()

	const [id, setId] = useState('')
	const [addTask, setAddTask] = useState(false)
	const [formData, setFormData] = useState({
		taskTitle:'',
		deadline: null
	})

	
	const onTaskChange = (e) =>{
		let input = e.target.value;
		let field = e.target.name;
		setFormData ({ ...formData, [field]: input })
	}
	const onTextChange = (e) => {
		let field = e.target.name;
		let value = e.target.value;
		dispatch(editUserTask({value, id,field}))


	  };
	const addNewTask =()=>{
		dispatch(addUserTask(formData))
		setAddTask(false)
		setFormData ({
			taskTitle:'',
			deadline: null
		})
	}
	
	return(
		<NEW_TABLE style={{width:'100%'}}>
			<NEW_THEAD>
				<NEW_TR className={style.mytask__tr}>
					<NEW_TH>Задача</NEW_TH>
					<NEW_TH>Дедлайн</NEW_TH>
				</NEW_TR>
			</NEW_THEAD>
			<NEW_TBODY>
				
						{tasks.filter(task=>!task.project).map((task)=>{
							return(
								<NEW_TR key={task._id} className={style.mytask__tr}>
									<NEW_TD>
									<input
										type="checkbox"
										defaultChecked={task.taskStatus}
										value={task._id}
										onChange={onChange}
									></input>
										<input
											style={{
												width:'80%',
												background:`${id===task._id?'white':'none'}`,
												border:`${id===task._id?'1px solid black':'1px solid transparent'}`
											}}
											className={newsp.input}
											type="text"
											defaultValue={task.taskTitle}
											name="taskTitle"
											onClick={()=>setId(task._id)}
											onChange={(e)=>onTextChange(e)}
										></input>
									</NEW_TD>
									<NEW_TD>
										{task.deadline && getDate(task.deadline)}
									</NEW_TD>
								</NEW_TR>
							)
						})}
				<NEW_TR className={style.mytask__tr} >
					<NEW_TD style={{paddingTop:'15px'}} >
						<ButtonTextDiv style={{display:`${!addTask?'block':'none'}`}} onClick={()=>{setAddTask(true)}}>Добавить задачу</ButtonTextDiv>
						<div style={{display:`${addTask?'flex':'none'}`}}>
							<input placeholder="Задача" name="taskTitle" type="text" onChange={(e)=>{onTaskChange(e)}}></input>
							<input placeholder="Дедлайн" name="deadline" type="date" onChange={(e)=>{onTaskChange(e)}}></input>
							<ButtonTextDiv style={{marginLeft:'15px'}} onClick={()=>addNewTask()}>Добавить</ButtonTextDiv>
						</div>
					</NEW_TD> 
				</NEW_TR>	
			</NEW_TBODY>	
		</NEW_TABLE>
			
			
	
		
	)
}
export default MyTasks