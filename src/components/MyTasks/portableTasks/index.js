
import modelsCss from '../../../Styles/modules/components/Project/models.module.css'
import { Light, Regular } from '../../../Styles/typography'
import UserTasks from './portableTasks'
import myTasks from '../../../Styles/modules/main/mytasksSmall.module.css'
import { useEffect, useState } from 'react'
import ProjTasks from './portableProj'
import { useDispatch, useSelector } from 'react-redux'
import { background, myTaskDelite, sortUserTasks, tasksStatus } from '../../../redux/actions/user'
import getCurrentMonth from './../getCurrentMonth'
import { finishUserTask } from "../../../redux/actions/user"
import getDate from '../../Projects/getDate'
import DeadlineTasks from './portableDeadline'

import TaskLoader from './../loader'

import { getUserTasks, loadUser } from '../../../redux/actions/auth'
import { Link } from 'react-router-dom'

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
        dispatch(getUserTasks())
		return () => {
          dispatch(loadUser())
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

	const sortTasks =(e)=>{
		let val = e.target.value
		dispatch(sortUserTasks(val))
	}
	const mainTasksPage =()=>{
		dispatch(tasksStatus(null))
		
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
					<div className={myTasks.main}>
						<Light fontSize='16px'
                        color='white'
							style={{fontWeight:pages==='/all'?'bold':'',
                            cursor:'pointer', 
                            borderBottom:pages==='/all'?'4px solid white':'4px solid transparent'}}
							className={myTasks.options__button} 
							onClick={()=>{setPages('/all')}}>
							Проектные
						</Light>
						<Light fontSize='16px' 
                        color='white'
							style={{fontWeight:pages==='/today'?'bold':'',
                            cursor:'pointer', 
                            borderBottom:pages==='/today'?'4px solid white':'4px solid transparent'}}
							className={myTasks.options__button} 
							onClick={()=>{setPages('/today')}}>
							Мои
						</Light>
						<Light fontSize='16px'
                            color='white'
							style={{fontWeight:pages==='/deferred'?'bold':'',
                            cursor:'pointer', 
                            borderBottom:pages==='/deferred'?'4px solid white':'4px solid transparent'}}
							className={myTasks.options__button}
							onClick={()=>{setPages('/deferred')}}>
							Планируемые
						</Light>
					</div>
					<div>
						<div style={{display:`${pages==='/all'?'block':'none'}`}}>
							<ProjTasks projList={projList} onChange={onChange}  month={currentMonth} history={history} tasks={user.tasks}></ProjTasks>
						</div>
						<div style={{display:`${pages==='/today'?'block':'none'}`}}>
							<UserTasks onPressEnter={onPressEnter} delTask={delTask} onChange={onChange} currentDate={currentDate} history={history} tasks={user.activeTasks}></UserTasks>
						</div>
						<div style={{display:`${pages==='/deferred'?'block':'none'}`}}>
							<DeadlineTasks onPressEnter={onPressEnter} delTask={delTask} onChange={onChange} currentDate={currentDate} history={history} tasks={user.deadlineTasks}></DeadlineTasks>
						</div>
						
					</div>
                    
                    <Link onClick={()=>mainTasksPage()} to='../../../../mytasks'><Regular size='14' onMouseEnter={(e)=>{e.target.style.textDecoration='underline'}}
                        onMouseLeave={(e)=>{e.target.style.textDecoration='none'}}
                        className={myTasks.taskLink} color='white'>Подробнее...</Regular>
					</Link>
				</div>
			</TaskLoader>
				
			
	
		
	)
}

export default MyTasks