import { useEffect, useState } from "react"
import style from "../../Styles/modules/main/mytasks.module.css"
import newsp from "../../Styles/modules/components/Project/newsprint.module.css"
import { NEW_TABLE, NEW_TBODY, NEW_TD, NEW_TH, NEW_THEAD, NEW_TR } from "../../Styles/tables"
import { ButtonTextDiv} from "../../Styles/buttons"
import getDate from "../Projects/getDate"
import { useDispatch} from "react-redux"
import { addUserTask, editUserTask } from "../../redux/actions/user"
import { Light } from "../../Styles/typography"

const DeadlineTasks =({tasks, onChange,currentDate, delTask, onPressEnter})=>{
	const dispatch = useDispatch()
	const [id, setId] = useState('')
	const [actualInput, setActualInput] = useState('')
	const [debounced, setDebouced] = useState('')
	const [timeout , updateTimeout] = useState(undefined)
	// const onTextChange = (e) => {
	// 	let field = e.target.name;
	// 	let value = e.target.value;
	// 	dispatch(editUserTask({value, id,field}))
	//   };
	useEffect(()=>{
		setActualInput('')
	},[id])
	const onPressEscape =()=>{
		setId('')
	
	}
	const debounce =(fn,ms)=>{
		const huy=()=> {
				clearTimeout(timeout)
				updateTimeout(setTimeout(fn, ms)) 
		}
		return huy()
	}
	const ready =(e)=>{
		e.target.blur()
		setActualInput('')
		setId('')
	};
	const onTextChange =()=>{
		let value = debounced
		let field = 'taskTitle'
		dispatch(editUserTask({value, id,field}))
	};
	useEffect(()=>{
		if(debounced!==''){
			debounce(onTextChange,500)
		}
	},[debounced])
	
	return(
		<>
		<div className={style.addTask}>
			
			{/* <div >
				<input className={style.deadlineInput} placeholder="Добавить задачу" onKeyDown={(e)=>e.key==='Enter'?addNewTask(e):''} name="taskTitle" type="text"value={formData.taskTitle} onChange={(e)=>{onTaskChange(e)}}></input>
				<input className={style.deadlineInputDate} placeholder="Дедлайн"  onKeyDown={(e)=>e.key==='Enter'?addNewTask(e):''} name="deadline" type="date" value={formData.deadline} onChange={(e)=>{onTaskChange(e)}}></input>
				<ButtonTextDiv style={{marginLeft:'15px',marginTop:'5px'}} onClick={()=>addNewTask()}>Добавить</ButtonTextDiv>
			</div> */}
		</div>
		
		<NEW_TABLE style={{width:'100%'}} >
			
			<NEW_THEAD>
				<NEW_TR  className={style.mytask__tr__nohover}>
					<NEW_TH>Задача</NEW_TH>
					<NEW_TH>Дедлайн</NEW_TH>
				</NEW_TR>
			</NEW_THEAD>
			<NEW_TBODY>
				
						{tasks.map((day)=>{
							return(
								<>
								{day.tasks.filter(task=>task.deadline&&!task.taskStatus).length!==0?<Light size='14' className={style.date} color='#8C8C8C'>{currentDate===getDate(day.date)?'Сегодня':getDate(day.date)}</Light>:''}
								{day.tasks.filter(task=>task.deadline).map((task)=>{
									return(
										<NEW_TR key={task._id} onClick={()=>setId(task._id)}
											style={{outline:'none',backgroundColor:`${id===task._id?'#F1EFEF':''}`}}
										 	className={style.mytask__tr}
											tabIndex="0"
											onKeyDown={(e)=>e.key==='Delete'?delTask(task._id):e.key==='Enter'?ready(e):e.key==='Escape'?onPressEscape():''}>
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
												background:`${actualInput===task._id?'white':'none'}`,
												pointerEvents:`${id===task._id?'auto':'none'}`,
												WebkitUserSelect:`${id===task._id?'none':'none'}`,
												border:`${actualInput===task._id?'1px solid black':'1px solid transparent'}`
											}}
											className={newsp.input}
											type="text"
											defaultValue={task.taskTitle}
											name="taskTitle"
											// onKeyDown={(e)=>e.key==='Delete'?delTask(task._id):''}
											
											onClick={()=>setActualInput(task._id)}
											onChange={(e)=>setDebouced(e.target.value)}
										></input>
										<ButtonTextDiv name="taskTitle" onClick={()=>delTask(task._id)} style={{visibility: `${id===task._id?'visible':'hidden'}`}}>Удалить</ButtonTextDiv>
									</NEW_TD>
									<NEW_TD>
										{task.deadline && getDate(task.deadline)}
									</NEW_TD>
								</NEW_TR>
									)
								})}
								</>
							)
						})}
				
			</NEW_TBODY>	
		</NEW_TABLE>
		</>	
			
	
		
	)
}
export default DeadlineTasks