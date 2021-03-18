import styles from '../../../../Styles/modules/components/Project/oneproj.module.css'
import table from '../../../../Styles/modules/components/Project/editproj.module.css'
import sprintcss from "../../../../Styles/modules/components/Project/newsprint.module.css"
import {Card,SmallCard, ModalContainer, ModalWind} from '../../../../Styles/common'
import {Button, ButtonText} from '../../../../Styles/buttons'
import { Bold, Light, Regular, Thin } from '../../../../Styles/typography'

import { useSelector } from 'react-redux'
import Tag from './tag'
import { Sprint_Td, Td, Tr, New_table,New_thead,New_tbody, New_Td, New_Th,New_Tr} from '../../../../Styles/tables'
import { Circle } from '../../../../Styles/project'
import { Link } from 'react-router-dom'
import { url } from '../../../utils/axios'
import { useEffect, useState } from 'react'


const ProjHistory = ({project,history}) => {
    // const [overCard, setOvercard] = useState(false)

	const [green, setGreen] = useState(false)
	const pushToSprint =(id)=>{
		history.push(`/projects/${project.crypt+'/'+id}`)
	}
    return(
   	 <div className={styles.history}>
		<div className={styles.title__history}>
			<div className={styles.title__info} >
					<img  src='/info.png' style={{marginRight:'10px'}} ></img>
					<Thin size='22'>История проекта</Thin>
			</div>
			
			<div className={styles.title__tags} >
				{/* <Thin size='22'>Спринты: </Thin> */}
				<Tag projectPage={true} tagColor='#E9E3C8'crypt={project.crypt}tagText='Все'></Tag>
				{project.tags.map((tag,i)=>{
					return(
						<Tag projectPage={true} crypt={project.crypt} tagText={tag}tagColor='#C8D9E9' key={i}></Tag>
					)
					
				})}
			</div>
		</div>
		<div >
			<New_table className={styles.history_table2} >
				<New_thead  >
					<New_Tr className={styles.history_head}>
						<New_Th className={styles.history_first}>Название</New_Th>
						<New_Th className={styles.history_tags} >Тег</New_Th>
						<New_Th className={styles.history_creator}>Создал</New_Th>
						<New_Th >Прогресс</New_Th>
						<New_Th className={styles.off}>Дедлайн</New_Th>
					</New_Tr>
				</New_thead>
				
				<New_tbody >
				{project!==undefined?project.sprints.map((sprint,i)=>{
					
						return(
						
						<New_Tr onClick={()=>pushToSprint(sprint._id)}  key={i}>
							<New_Td size='14' className={styles.tdd}>{sprint.tasks!==undefined?<Circle red={sprint.tasks.length===0?true:false} style={{marginRight:'10px'}}></Circle>:''}{sprint.title}</New_Td>
							<New_Td className={styles.history_tags} size='14' >{sprint.tags!==undefined?sprint.tags.map((tag,i)=>{return(<Tag projectPage={true} crypt={project.crypt} tagText={tag}tagColor='#C8D9E9' size='13' key={i}></Tag>)}):''}</New_Td>
							<New_Td className={styles.history_creator} size='14' > {sprint.creator===undefined?'нет':sprint.creator.fullname}<img className={sprintcss.img__td} style={{opacity:sprint.creator===undefined?0:1}} src={sprint.creator===undefined?'/Ellipse 13.png':url+'/'+sprint.creator.avatar}></img></New_Td>
							<New_Td  size='14' >{sprint.tasks!==undefined?sprint.tasks.filter(task=>task.taskStatus).length+'/'+sprint.tasks.length:''}
								<div className={sprintcss.card__thing}>
									<div
										style={{
										width: `${Math.trunc((sprint.tasks!==undefined?sprint.tasks.filter(task=>task.taskStatus).length / sprint.tasks.length:'') * 100)}%`,
										}}
										className={sprintcss.card__thing__full}
									></div>
								</div>
							</New_Td>
							<New_Td className={styles.off} size='14'>нет</New_Td>					
						</New_Tr>
						
						)
						
					}):''}
				</New_tbody>
			
			</New_table>
		</div>
		</div>
    )
}
export default ProjHistory