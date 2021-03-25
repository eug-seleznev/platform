import { useEffect, useState } from "react"
import style from "../../Styles/modules/main/mytasks.module.css"
import newsp from "../../Styles/modules/components/Project/newsprint.module.css"
import { NEW_TABLE, NEW_TBODY, NEW_TD, NEW_TH, NEW_THEAD, NEW_TR } from "../../Styles/tables"
import { ButtonText, ButtonTextDiv} from "../../Styles/buttons"
import getDate from "../Projects/getDate"
import { useDispatch} from "react-redux"
import { addUserTask, editUserTask, myTaskDelite } from "../../redux/actions/user"
import { Light, Thin } from "../../Styles/typography"
import { Input } from "../../Styles/Forms"


const MyTasks =({tasks,onChange,currentDate, delTask})=>{
	const dispatch = useDispatch()
	
	const [id, setId] = useState('')
	const [deadline, setDeadline] = useState(false)

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
		e.preventDefault()
		let field = e.target.name;
		let value = e.target.value;
		console.log(field, value)
		dispatch(editUserTask({value, id,field}))
		setDeadline(false)

	  };
	  
	const onSubmit=(e)=>{

		e.target.blur()
		
		setId('')
	}
	const addNewTask =()=>{
		if(formData.taskTitle!==''){
			dispatch(addUserTask(formData))
			
			setFormData ({
			taskTitle:'',
			deadline: null
		})
		}
		else if (formData.taskTitle==='') {
			alert("Заполните поле задачи")
		}
		
		
	}
	
	return(
		<>
		<div className={style.addTask}>
			
			<div>
				<input placeholder="Добавить задачу"  onKeyDown={(e)=>e.key==='Enter'?addNewTask(e):''}name="taskTitle" type="text"value={formData.taskTitle} onChange={(e)=>{onTaskChange(e)}}></input>
				{/* <input placeholder="Дедлайн" name="deadline" type="date" onChange={(e)=>{onTaskChange(e)}}></input> */}
				<ButtonTextDiv style={{marginLeft:'15px',marginTop:'5px'}} onClick={()=>addNewTask()}>Добавить</ButtonTextDiv>
			</div>
		</div>
		
		<NEW_TABLE style={{width:'100%'}} >
			
			<NEW_THEAD>
				<NEW_TR className={style.mytask__tr}>
					<NEW_TH>Задача</NEW_TH>
				</NEW_TR>
			</NEW_THEAD>
			<NEW_TBODY>
				
						{tasks.map((day)=>{
							return(
								<>
								{day.tasks.filter(task=>!task.deadline).length>0?
								<Light size='14' className={style.date} color='#8C8C8C'>{currentDate===getDate(day.date)?'Сегодня':getDate(day.date)}</Light>:''}
								{day.tasks.filter(task=>!task.deadline).map((task)=>{
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
												width:'65%',
												background:`${id===task._id?'white':'none'}`,
												border:`${id===task._id?'1px solid black':'1px solid transparent'}`
											}}
											className={newsp.input}
											type="text"
											defaultValue={task.taskTitle}
											onKeyDown={(e)=>e.key==='Delete'?delTask(task._id):e.key==='Enter'?onSubmit(e):''}
											name="taskTitle"
											onClick={()=>setId(task._id)}
											onChange={(e)=>onTextChange(e)}
										></input>
										<ButtonTextDiv onClick={()=>delTask(task._id)} style={{visibility: `${id===task._id?'visible':'hidden'}`}}>Удалить</ButtonTextDiv>
								
									
										
									</NEW_TD>
									<NEW_TD style={{width:'250px'}}>
										<form onSubmit={(e)=>onTextChange(e)} style={{display:`${task._id === id?'flex':'none'}`}}>
											<Thin >Дедлайн: </Thin> 
											<ButtonTextDiv onClick={()=>setDeadline(true)}
											style={{display:`${task._id !== id||!deadline?'block':'none'}`}}>
											{task.deadline!==null?getDate(task.deadline):'указать'}
											</ButtonTextDiv>
											
											<Input 
											
												type="date"
												name="deadline" 
												onKeyDown={(e)=>e.key==='Enter'?onTextChange(e):''}
												style={{display:`${task._id === id&&deadline?'block':'none'}`}}>
											</Input>
											
										</form>
									</NEW_TD>
								</NEW_TR>
									)
								})}
								
								</>
								
								// <NEW_TR key={task._id} className={style.mytask__tr}>
								// 	<NEW_TD>
								// 	<input
								// 		type="checkbox"
								// 		defaultChecked={task.taskStatus}
								// 		value={task._id}
								// 		onChange={onChange}
								// 	></input>
								// 		<input
								// 			style={{
								// 				width:'80%',
								// 				background:`${id===task._id?'white':'none'}`,
								// 				border:`${id===task._id?'1px solid black':'1px solid transparent'}`
								// 			}}
								// 			className={newsp.input}
								// 			type="text"
								// 			defaultValue={task.taskTitle}
								// 			name="taskTitle"
								// 			onClick={()=>setId(task._id)}
								// 			onChange={(e)=>onTextChange(e)}
								// 		></input>
								// 	</NEW_TD>
								// 	<NEW_TD>
								// 		{task.deadline && getDate(task.deadline)}
								// 	</NEW_TD>
								// </NEW_TR>
							)
						})}
				
			</NEW_TBODY>	
		</NEW_TABLE>
		</>	
			
	
		
	)
}
export default MyTasks