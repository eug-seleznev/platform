import { ButtonText, ButtonTextLight } from '../../Styles/buttons'
import modelsCss from '../../Styles/modules/components/Project/models.module.css'
import { Light } from '../../Styles/typography'
import TaskLoader from './loader'
import myTasks from '../../Styles/modules/main/mytasks.module.css'
import { useEffect, useState } from 'react'
import AllTasks from './allTasks'
import { useSelector } from 'react-redux'
// import { Route, Router, Switch } from 'react-router'

// import {Link, NavLink } from 'react-router-dom'
const MyTasks = ({history, match})=>{
	const [pages, setPages]= useState('/')
	const user = useSelector(state=>state.auth.user)
	
	useEffect(()=>{
		console.log(user)
		setPages()
	},[match])

	const pushBack =()=>{
		history.push(`./`)
	}
	// const pushIn =()=>{
		
	// }
	return(
		<TaskLoader>
			
				<div className={modelsCss.main}>	
					<div className={modelsCss.row} >
						<ButtonText fontSize='16px' onClick={pushBack}>Главная</ButtonText>
						<Light size='16'> / мои задачи</Light>
					</div>
					<div className={myTasks.options}>
						<ButtonText fontSize='16px' className={myTasks.options__button} onClick={()=>{setPages('/all')}}>Все задачи</ButtonText>
						<ButtonText fontSize='16px' className={myTasks.options__button} onClick={()=>{setPages('/today')}}>Задачи на сегодня</ButtonText>
						<ButtonText fontSize='16px' className={myTasks.options__button} onClick={()=>{setPages('/deferred')}}>Отложенные</ButtonText>
						<ButtonText fontSize='16px' className={myTasks.options__button} onClick={()=>{setPages('/history')}}>История</ButtonText>
					</div>
					<div>
						<AllTasks tasks={user.tasks}></AllTasks>
					</div>
				</div>
			
		</TaskLoader>
		
	)
}

export default MyTasks