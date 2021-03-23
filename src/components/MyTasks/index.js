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
// import { Route, Router, Switch } from 'react-router'

// import {Link, NavLink } from 'react-router-dom'
const MyTasks = ({history, match})=>{
	const [pages, setPages]= useState('/all')
	const [currentMonth, setCurrentMonth] =useState('')
	const dispatch = useDispatch();
	const user = useSelector(state=>state.auth.user)
	useEffect(()=>{ 
		dispatch(background('white'))
		setCurrentMonth(getCurrentMonth(Date.now()))
		return () => {
		  dispatch(background('#ECECEC'))
		}
		
	  }, [])

	const pushBack =()=>{
		history.push(`./`)
	}
	
	const onChange = (e) => {
		
		let taskid = e.target.value;
		dispatch(finishUserTask({ taskid }));
	  };
	return(
		
			
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
							className={myTasks.options__button}
							onClick={()=>{setPages('/deferred')}}>
							Отложенные
						</ButtonText>
						<ButtonText fontSize='16px'
							className={myTasks.options__button}
							onClick={()=>{setPages('/history')}}>
							История	
						</ButtonText>
					</div>
					<div>
						<div style={{display:`${pages==='/all'?'block':'none'}`}}>
							<ProjTasks onChange={onChange} month={currentMonth} history={history} tasks={user.tasks}></ProjTasks>
						</div>
						<div style={{display:`${pages==='/today'?'block':'none'}`}}>
							<UserTasks onChange={onChange} history={history} tasks={user.tasks}></UserTasks>
						</div>
						
					</div>
				</div>
			
	
		
	)
}

export default MyTasks