import styles from '../../../../Styles/modules/components/Project/oneproj.module.css'

import sprintcss from "../../../../Styles/modules/components/Project/newsprint.module.css"

import { Light, Thin } from '../../../../Styles/typography'


import Tag from './tag'
import {  NEW_TD, NEW_TR, NEW_TBODY, NEW_THEAD, NEW_TH,NEW_TABLE} from '../../../../Styles/tables'
import { Circle } from '../../../../Styles/project'


import { useEffect } from 'react'
import getDate from '../../getDate'



const ProjHistory = ({project,history}) => {
    // const [overCard, setOvercard] = useState(false)
	useEffect(()=>{
		console.log(project)
	},[project])

	const pushToSprint =(id)=>{
		history.push(`/projects/${project.crypt+'/tasks/'+id}`)
	}
    return(
   	 <div className={styles.history}>
		<div className={styles.title__history}>
			<div className={styles.title__info} >
					<img alt='info'  src={Path+'info.png'} style={{marginRight:'10px'}} ></img>
					<Light size='18'>История проекта</Light>
			</div>
			
			<div className={styles.title__tags} >
				{/* <Thin size='22'>Спринты: </Thin> */}
				{/* <Tag projectPage={true} tagColor='#E9E3C8'crypt={project.crypt}tagText='Все'></Tag>
				{project.tags.map((tag,i)=>{
					return(
						<Tag projectPage={true} crypt={project.crypt} tagText={tag}tagColor='#C8D9E9' key={i}></Tag>
					)
					
				})} */}
			</div>
		</div>
		<div className={styles.history_table2}>
			<NEW_TABLE style={{width:'100%'}} >
				{/* <NEW_THEAD  >
					<NEW_TR className={styles.history_head}>
						<NEW_TH className={styles.history_first}>Название</NEW_TH>
						<NEW_TH className={styles.history_tags} >Тег</NEW_TH>
						<NEW_TH className={styles.history_creator}>Создал</NEW_TH>
						<NEW_TH >Прогресс</NEW_TH>
						<NEW_TH className={styles.off}>Дедлайн</NEW_TH>
					</NEW_TR> */}
				{/* </NEW_THEAD> */}
				
				<NEW_TBODY>
				{project!==undefined?project.sprints.map((sprint,i)=>{
            if(sprint.status == false) return;
						return (
              <NEW_TR onClick={() => pushToSprint(sprint._id)} key={i}>
                <NEW_TD size="14" className={styles.tdd}>
                  {sprint.tasks.length -
                    sprint.tasks.filter((task) => task.taskStatus).length ===
                  0 ? (
                    <Circle color="#6DD66B"style={{marginRight:'5px'}} />
                  ) : (
                    <Circle color="#DD5757" style={{marginRight:'5px'}} />
                  )}
                   {sprint.title}
                </NEW_TD>
                <NEW_TD className={styles.history_tags} size="14">
                  {sprint.tags !== undefined
                    ? sprint.tags.map((tag, i) => {
                        return (
                          <Tag
                            projectPage={true}
                            crypt={project.crypt}
                            tagText={tag}
                            tagColor="#C8D9E9"
                            size="13"
                            key={i}
							style={{marginRight:`${i===0?'20px':'0px'}`}}
                          ></Tag>
                        );
                      })
                    : ""}
                </NEW_TD>
                
                <NEW_TD className={styles.sprintDateHist} size="14">
                  {getDate(sprint.dateOpen)}
                </NEW_TD>
              </NEW_TR>
            );
						
					}):''}
				</NEW_TBODY>
			
			</NEW_TABLE>
		</div>
		</div>
    )
}
export default ProjHistory