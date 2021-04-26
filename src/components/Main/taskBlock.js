import { useEffect, useState } from 'react'
import { SmallCard } from '../../Styles/common'
import styles from '../../Styles/modules/main/main.module.css'
import { Bold, Light } from '../../Styles/typography'
import { Path } from '../Layout/header'

const TaskBlock = ({user, history}) => {
  	const[activeSprints,setActiveSprints] = useState(0)	
	useEffect(()=>{

		user.projects.filter(proj=>!proj.status).map((el,i)=>{
			let res = el.sprints.filter(sprint=>!sprint.status).length
			setActiveSprints(activeSprints => activeSprints+res)	
		})
	}, [])
	const pushToTasks =()=>{
		history.push('/mytasks')
	}
    return(
		<div className={styles.tasks}>
			<div className={styles.create__news}>
				<img className={styles.create__news__img}alt='tasks' src={Path+'tasks.png'}></img>
				<Bold color="black" size="18">
					Задачи
				</Bold>
			
			</div>
			<SmallCard className={styles.my_tasks} onClick={pushToTasks}>
				<Light size='16' color='#3F496C'>Мои задачи</Light>
				<Light size='16' color='#3F496C'>{user.tasks.length!==0?user.tasks.filter(task=>!task.taskStatus).length:0}</Light>
			</SmallCard>
			<SmallCard className={styles.my_tasks}>
				<Light size='16' color='#3F496C'>Активные спринты</Light>
				<Light size='16' color='#3F496C'>{activeSprints}</Light>
			</SmallCard>
	  	</div>
       
             
    )
}

export default TaskBlock 