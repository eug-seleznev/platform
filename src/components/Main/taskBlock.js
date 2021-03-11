import { SmallCard } from '../../Styles/common'
import styles from '../../Styles/modules/main/main.module.css'
import { Bold, Light } from '../../Styles/typography'

const TaskBlock = ({user, history}) => {

    return(
		<div className={styles.tasks}>
			<div className={styles.create__news}>
				<img className={styles.create__news__img}  src='/tasks.png'></img>
				<Bold color="black" size="18">
					Задачи
				</Bold>
			
			</div>
			<SmallCard className={styles.my_tasks}>
				<Light size='16' color='#3F496C'>Мои задачи</Light>
				<Light size='16' color='#3F496C'>{user.tasks.length}</Light>
			</SmallCard>
			<SmallCard className={styles.my_tasks}>
				<Light size='16' color='#3F496C'>Активные спринты</Light>
				<Light size='16' color='#3F496C'>{user.projects.length}</Light>
			</SmallCard>
	  	</div>
       
             
    )
}

export default TaskBlock 