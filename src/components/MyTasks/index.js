import { ButtonText } from '../../Styles/buttons'
import modelsCss from '../../Styles/modules/components/Project/models.module.css'
import { Light } from '../../Styles/typography'
import UserTasks from './myTasks.js'
import myTasks from '../../Styles/modules/main/mytasks.module.css'
import { useEffect, useState } from 'react'
import ProjTasks from './projTasks'
import { useDispatch, useSelector } from 'react-redux'
import { background } from '../../redux/actions/user'
import getCurrentMonth from './getCurrentMonth'
import { finishUserTask } from "../../redux/actions/user"
import getDate from '../Projects/getDate'
import DeadlineTasks from './deadlineTasks'
import TaskHistory from './history'
import TaskLoader from './loader'
// import { Route, Router, Switch } from 'react-router'

// import {Link, NavLink } from 'react-router-dom'
const MyTasks = ({history, match})=>{
	const [pages, setPages]= useState('/all')
	const [currentMonth, setCurrentMonth] =useState('')
	const [currentDate, setCurrentDate] =useState('')
const [projList,setProjList] =useState([])
 

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
		  console.log(user.tasks)
		user.tasks.filter(task=>task.project)
		.map((task)=>{
			
				setProjList(projList => [...projList, !projList.includes(task.project.title)? task.project.title: ''])
			}
		)
		
	   },[user.tasks])
	
	useEffect(()=>{
	
		console.log(projList)	
		
	},[projList])
	const pushBack =()=>{
		history.push(`./`)
	}
	const pushToProject =(link)=>{
		history.push(`./projects/${link}`)
	}
	const onChange = (e) => {
		
		let taskid = e.target.value;
		dispatch(finishUserTask({ taskid }));
	  };
	return(
		
			<TaskLoader>
				<div className={modelsCss.main}>	
					<div className={modelsCss.row} >
						<ButtonText fontSize='16px' onClick={pushBack}>Главная</ButtonText>
						<Light size='16'> / мои задачи</Light>
					</div>
					<div className={myTasks.options}>
						<ButtonText fontSize='16px'
							style={{textDecoration:`${pages==='/all'?'underline':''}`,fontWeight:`${pages==='/all'?'bold':''}`}}
							className={myTasks.options__button} onClick={()=>{setPages('/all')}}>
							Задачи на проекте
						</ButtonText>
						<ButtonText fontSize='16px' 
							style={{textDecoration:`${pages==='/today'?'underline':''}`,fontWeight:`${pages==='/today'?'bold':''}`}}
							className={myTasks.options__button} 
							onClick={()=>{setPages('/today')}}>
							Мои задачи
						</ButtonText>
						<ButtonText fontSize='16px'
							style={{textDecoration:`${pages==='/deferred'?'underline':''}`,fontWeight:`${pages==='/deferred'?'bold':''}`}}
							className={myTasks.options__button}
							onClick={()=>{setPages('/deferred')}}>
							Задачи с дедлайном
						</ButtonText>
						<ButtonText fontSize='16px'
							style={{textDecoration:`${pages==='/history'?'underline':''}`,fontWeight:`${pages==='/history'?'bold':''}`}}
							className={myTasks.options__button}
							onClick={()=>{setPages('/history')}}>
							История	
						</ButtonText>
					</div>
					<div>
						<div style={{display:`${pages==='/all'?'block':'none'}`}}>
							<ProjTasks projList={projList} onChange={onChange} pushToProject={pushToProject} month={currentMonth} history={history} tasks={user.tasks}></ProjTasks>
						</div>
						<div style={{display:`${pages==='/today'?'block':'none'}`}}>
							<UserTasks onChange={onChange} currentDate={currentDate} history={history} tasks={user.activeTasks}></UserTasks>
						</div>
						<div style={{display:`${pages==='/deferred'?'block':'none'}`}}>
							<DeadlineTasks onChange={onChange} currentDate={currentDate} history={history} tasks={user.activeTasks}></DeadlineTasks>
						</div>
						<div style={{display:`${pages==='/history'?'block':'none'}`}}>
							<TaskHistory onChange={onChange} pushToProject={pushToProject}  history={history} tasks={user.taskHistory}></TaskHistory>
						</div>
					</div>
				</div>
			</TaskLoader>
				
			
	
		
	)
}

export default MyTasks