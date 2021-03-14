import styles from '../../../../Styles/modules/components/Project/oneproj.module.css'
import table from '../../../../Styles/modules/components/Project/editproj.module.css'
import sprintcss from "../../../../Styles/modules/components/Project/newsprint.module.css"
import {Card,SmallCard, ModalContainer, ModalWind} from '../../../../Styles/common'
import {Button, ButtonText} from '../../../../Styles/buttons'
import { Bold, Light, Regular, Thin } from '../../../../Styles/typography'

import { useSelector } from 'react-redux'
import Tag from './tag'


const ProjHistory = ({project,history}) => {
    // const [overCard, setOvercard] = useState(false)
const tag = ['govno','mocha', 'huy']  

    return(
   	 <div className={styles.history}>
		<div className={styles.title__history}>
			<div className={styles.title__info} >
					<img  src='/info.png' style={{marginRight:'10px'}} ></img>
					<Thin size='22'>История проекта</Thin>
			</div>
			
			<div className={styles.title__tags} >
				<Thin size='22'></Thin>
				{project.tags.map((tag,i)=>{
					return(
						<Tag tagText={tag}tagColor='#C8D9E9' key={i}></Tag>
					)
					
				})}
			</div>
		</div>
		<div className={table.table__sprint}>
			<table style={{borderCollapse:'collapse'}}>
				<thead className={table.table__head}>
					<tr>
						<th ><Thin size='16'>Название</Thin></th>
						<th ><Thin size='16'>Тег</Thin></th>
						<th className={table.off}><Thin size='16'>Создал</Thin></th>
						<th ><Thin size='16'>Прогресс</Thin></th>
						<th className={table.off}><Thin  size='16'>Дедлайн</Thin></th>
					</tr>
				</thead>
				
				<tbody>
				{project!==undefined?project.sprints.map((sprint,i)=>{
						return(
						<tr key={i}>
								<td  ><Thin size='16'>{sprint.title}</Thin></td>
								<td className={table.tag}>{sprint.tags.map((tag)=>{return(<Tag tagText={tag}tagColor='#C8D9E9' size='13' key={i}></Tag>)})}</td>
								<td  className={table.center}><Thin size='13'>{sprint.creator}</Thin></td>
								<td  className={table.center}><Thin size='13'>{sprint.tasks.filter(task=>task.taskStatus).length+'/'+sprint.tasks.length}</Thin>
									<div className={sprintcss.card__thing}>
										<div
											style={{
											width: `${Math.trunc((sprint.tasks.filter(task=>task.taskStatus).length / sprint.tasks.length) * 100)}%`,
											}}
											className={sprintcss.card__thing__full}
										></div>
									</div>
								</td>
								<td   className={table.center}><Thin size='13'>hi</Thin></td>					

						</tr>
						
						)
						
					}):''}
				</tbody>
			
			</table>
		</div>
		</div>
    )
}
export default ProjHistory