import { ButtonText, ButtonTextLight } from '../../Styles/buttons'
import modelsCss from '../../Styles/modules/components/Project/models.module.css'
import { Light, Regular } from '../../Styles/typography'
import UserTasks from './myTasks.js'
import myTasks from '../../Styles/modules/main/mytasks.module.css'
import { useEffect, useState } from 'react'
import ProjTasks from './projTasks'
import { useDispatch, useSelector } from 'react-redux'
import { background, myTaskDelite, sortUserTasks } from '../../redux/actions/user'
import getCurrentMonth from './getCurrentMonth'
import { finishUserTask } from "../../redux/actions/user"
import getDate from '../Projects/getDate'
import DeadlineTasks from './deadlineTasks'
import TaskHistory from './history'
import TaskLoader from './loader'
import { Select } from '../../Styles/tables'
import { editUserTask} from "../../redux/actions/user"

// import {Link, NavLink } from 'react-router-dom'
const MyTasks = ({history})=>{
	const [pages, setPages]= useState('/all')
	const [currentMonth, setCurrentMonth] =useState('')
	const [currentDate, setCurrentDate] =useState('')
	const [projList,setProjList] =useState([])
	const [typeFilter, setTypeFilter] = useState ('Все')

	const dispatch = useDispatch();
	const user = useSelector(state=>state.auth.user)
	useEffect(()=>{ 
		dispatch(background('white'))
		setCurrentMonth(getCurrentMonth(Date.now()))
		setCurrentDate(getDate(Date.now()))
		return () => {
		  dispatch(background('#ECECEC'))
		}
		
	  }, [])
	  useEffect(()=>{
		user.tasks.filter(task=>task.project)
		.map((task)=>{
			
				setProjList(projList => [...projList, !projList.includes(task.project.title)? task.project.title: ''])
			}
		)
		
	   },[user.tasks])


	const pushBack =()=>{
		history.push(`./`)
	}
	const delTask =(id)=>{
		dispatch(myTaskDelite(id))
	}
	const pushToProject =(link)=>{
		history.push(`./projects/${link}`)
	}
	const sortTasks =(e)=>{
		let val = e.target.value
		dispatch(sortUserTasks(val))
	}
	const onChange = (e) => {
		let taskid = e.target.value;
		dispatch(finishUserTask({ taskid }));
	  };
	const onPressEnter = (taskid) => {
		dispatch(finishUserTask({ taskid }));
	  };
	return(
		
			<TaskLoader>
				<div className={modelsCss.main}>	
					<div className={modelsCss.row} >
						<ButtonTextLight fontSize='16px' onClick={pushBack}>Главная</ButtonTextLight>
						<Light size='16'> / мои задачи</Light>
					</div>
					<div className={myTasks.options}>
						<ButtonTextLight fontSize='16px'
							style={{fontWeight:`${pages==='/all'?'bold':''}`}}
							className={myTasks.options__button} 
							onClick={()=>{setPages('/all')}}>
							Задачи на проекте
						</ButtonTextLight>
						<ButtonTextLight fontSize='16px' 
							style={{fontWeight:`${pages==='/today'?'bold':''}`}}
							className={myTasks.options__button} 
							onClick={()=>{setPages('/today')}}>
							Мои задачи
						</ButtonTextLight>
						<ButtonTextLight fontSize='16px'
							style={{fontWeight:`${pages==='/deferred'?'bold':''}`}}
							className={myTasks.options__button}
							onClick={()=>{setPages('/deferred')}}>
							Задачи с дедлайном
						</ButtonTextLight>
						<ButtonTextLight fontSize='16px'
							style={{fontWeight:`${pages==='/history'?'bold':''}`}}
							className={myTasks.options__button}
							onClick={()=>{setPages('/history')}}>
							История	
						</ButtonTextLight>
						<div style={{display:`${pages==='/all'?'flex':'none'}`, alignItems:'center', marginLeft:'30px'}}>
						<Regular>Поиск по проектам: </Regular>
							<Select onChange={(e)=>sortTasks(e)}>
								<option>Все</option>
								{projList.map((el, i)=>{
									if(el!==''){
										return(
										<option key={i}>
											{el}
										</option>
										)
									}
								})}
							</Select>
						
						</div>
						<div style={{display:`${pages==='/history'?'flex':'none'}`, alignItems:'center', marginLeft:'30px'}}>
						<Regular>Фильтр по типу: </Regular>
							<Select onChange={(e)=>{setTypeFilter(e.target.value)}}>
								<option>Все</option>
								<option>Мои задачи</option>
								<option>Проектные задачи</option>
							</Select>
						
						</div>
					</div>
					<div>
						<div style={{display:`${pages==='/all'?'block':'none'}`}}>
							<ProjTasks projList={projList} onChange={onChange} pushToProject={pushToProject} month={currentMonth} history={history} tasks={user.tasks}></ProjTasks>
						</div>
						<div style={{display:`${pages==='/today'?'block':'none'}`}}>
							<UserTasks onPressEnter={onPressEnter} delTask={delTask} onChange={onChange} currentDate={currentDate} history={history} tasks={user.activeTasks}></UserTasks>
						</div>
						<div style={{display:`${pages==='/deferred'?'block':'none'}`}}>
							<DeadlineTasks onPressEnter={onPressEnter} delTask={delTask} onChange={onChange} currentDate={currentDate} history={history} tasks={user.deadlineTasks}></DeadlineTasks>
						</div>
						<div style={{display:`${pages==='/history'?'block':'none'}`}}>
							<TaskHistory delTask={delTask} onPressEnter={onPressEnter} typeFilter={typeFilter} onChange={onChange} pushToProject={pushToProject}  history={history} tasks={user.taskHistory}></TaskHistory>
						</div>
					</div>
				</div>
			</TaskLoader>
				
			
	
		
	)
}

export default MyTasks