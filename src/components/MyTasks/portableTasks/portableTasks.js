import { useEffect, useState } from "react"
import style from "../../../Styles/modules/main/mytasks.module.css"
import myTasks from '../../../Styles/modules/main/mytasksSmall.module.css'
import newsp from "../../../Styles/modules/components/Project/newsprint.module.css"
import { NEW_TABLE, NEW_TBODY, NEW_TD, NEW_TH, NEW_THEAD, NEW_TR } from "../../../Styles/tables"
import { ButtonTextDiv} from "../../../Styles/buttons"
import getDate from "../../Projects/getDate"
import { useDispatch, useSelector} from "react-redux"
import { addUserTask, editUserTask, finishUserTask, myTaskDelite } from "../../../redux/actions/user"
import { Light, Thin } from "../../../Styles/typography"
import { Input } from "../../../Styles/Forms"
import { getUserTasks } from "../../../redux/actions/auth"
// import debounce from "./debounce"



const PortableTasks =({tasks})=>{
	const dispatch = useDispatch()
	const [id, setId] = useState('')
	const [debounced, setDebouced] = useState('')
	const [actualInput, setActualInput] = useState('')
	const [deadline, setDeadline] = useState(false)
    const [currentDate, setCurrentDate] =useState('')
	const [deadlineEnter, setDeadlineEnter] = useState(false)
	const [timeout , updateTimeout] = useState(undefined)
	const [formData, setFormData] = useState({
		taskTitle:'',
		deadline: null
	})
    const user = useSelector(state=>state.auth.user)
    useEffect(() => {
        dispatch(getUserTasks())
        setCurrentDate(getDate(Date.now()))
    }, [])
	const onChange = (e) => {
		let taskid = e.target.value;
		dispatch(finishUserTask({ taskid }));
	  };
    const delTask =(id)=>{
		dispatch(myTaskDelite(id))
	}
	const onTaskChange = (e) =>{
		let input = e.target.value;
		let field = e.target.name;
		setFormData ({ ...formData, [field]: input })
	}
	const onDeadlineChange =(e)=>{
		let value = e.target.value
		let field = 'deadline'
		dispatch(editUserTask({value, id,field}))
		setDeadline(false)
		setDeadlineEnter(false)
	};
	const debounce =(fn,ms)=>{
		const huy=()=> {
				clearTimeout(timeout)
				updateTimeout(setTimeout(fn, ms)) 
		}
		return huy()
	}
	const onTextChange =()=>{
		let value = debounced
		let field = 'taskTitle'
		console.log(value,id,field)
		dispatch(editUserTask({value, id,field}))
	};
	useEffect(()=>{
		if(debounced!==''){
			debounce(onTextChange,500)
		}
	},[debounced])
	
		// onTextChange = debounce(onTextChange,500)

	const onSubmit=(e)=>{

		e.target.blur()
		
		setId('')
	}
	const changeTask =(id2)=>{
		if(id2!==id){
			setId(id2)
		setActualInput('')
		}
		
		
	}
	const actInput =(id)=>{	
		setActualInput(id)
	}
	const onPressEscape =()=>{
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
				<input placeholder="Добавить задачу"
					className={myTasks.input}
					onKeyDown={(e)=>e.key==='Enter'?addNewTask(e):''}
					name="taskTitle" type="text"
					value={formData.taskTitle} 
					onChange={(e)=>{onTaskChange(e)}}></input>
				{/* <input placeholder="Дедлайн" name="deadline" type="date" className={style.deadlineInputDate}  onChange={(e)=>{onTaskChange(e)}}></input> */}
				
			</div>
		</div>
		
		<NEW_TABLE style={{width:'100%',background:'none'}} >
			
			<NEW_THEAD>
				<NEW_TR className={style.mytask__tr__nohover}>

				</NEW_TR>
			</NEW_THEAD>
			<NEW_TBODY>
						{user.activeTasks.map((day)=>{
							return(
								<>
								{day.tasks.filter(task=>!task.deadline).length>0?
								<div style={{display:'flex',paddingLeft:'24px',alignItems:'center',marginTop:'10px'}}>
									{currentDate===getDate(day.date)?
										<div style={{width:"12px", height:'12px',backgroundColor:'grey',borderRadius:'100%',fontSize:'8.5px'}}>
										{day.tasks.filter(task=>!task.deadline&&currentDate===getDate(day.date)).length}
									</div>:''
									}
									
									<Light size='16'style={{textAlign:'start',marginLeft:'6px'}}
									 color='#8C8C8C'>{currentDate===getDate(day.date)?'Сегодня':
									 getDate(day.date)}</Light>
									</div>:''}
								{day.tasks.filter(task=>!task.deadline).map((task)=>{
									return(
										<NEW_TR onClick={()=>changeTask(task._id)} key={task._id} 
										style={{outline:'none',
										backgroundColor:id===task._id?'grey':''}} 
										className={style.mytask__tr__port}

										tabIndex="0"
										onKeyDown={(e)=>e.key==='Delete'?delTask(task._id):e.key=='Enter'&&deadlineEnter==false?setActualInput(''):e.key==='Escape'?onPressEscape():''}
										
										>
									<NEW_TD style={{display:'flex', alignItems:'center',paddingLeft:'20px'}}>
										<div style={{filter:'invert(25%)',marginRight:'10px'}}>
											<input
											type="checkbox"
											defaultChecked={task.taskStatus}
											value={task._id}
											
											onChange={onChange}
											></input>
										</div>
										

									<input
									
									style={{
										width:'70%',
										background:`${actualInput===task._id?'white':'none'}`,
										fontFamily:'SuisseIntlLight',
										color:`${actualInput===task._id?'black':'white'}`,
										pointerEvents:`${id===task._id?'auto':'none'}`,
										WebkitUserSelect:`${id===task._id?'none':'none'}`,
										border:`${actualInput===task._id?'1px solid black':'1px solid transparent'}`
										}}
										className={newsp.input}
										type="text"
										defaultValue={task.taskTitle}
										name="taskTitle"
										// onKeyDown={(e)=>e.key==='Delete'?delTask(task._id):''}
										
										onClick={()=>actInput(task._id)}
										onChange={(e)=>setDebouced(e.target.value)}
									></input>
										<form onSubmit={(e)=>onDeadlineChange(e)} style={{display:`${task._id === id?'flex':'none'}`}}>
											
											<ButtonTextDiv onClick={()=>setDeadline(true)}
											style={{color:'white',display:`${task._id !== id||!deadline?'block':'none'}`}}>
											{task.deadline!==null?getDate(task.deadline):'дедлайн'}
											</ButtonTextDiv>
											
											<Input 
												type="date"
												name="deadline"
												onChange={(()=>{setDeadlineEnter(true)})}
												onKeyDown={(e)=>e.key==='Enter'?onDeadlineChange(e):''}
												style={{display:`${task._id === id&&deadline?'block':'none'}`,width:'125px'}}>
											</Input>
									
										</form>
									</NEW_TD>
									

									
								</NEW_TR>
									)
								})}
								
								</>
						
							)
						}).reverse()}
				
			</NEW_TBODY>	
		</NEW_TABLE>
 
		</>	
			
	
		
	)
}
export default PortableTasks