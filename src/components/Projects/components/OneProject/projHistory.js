import styles from '../../../../Styles/modules/components/Project/oneproj.module.css'

import sprintcss from "../../../../Styles/modules/components/Project/newsprint.module.css"

import { Thin } from '../../../../Styles/typography'


import Tag from './tag'
import {  NEW_TD, NEW_TR, NEW_TBODY, NEW_THEAD, NEW_TH,NEW_TABLE} from '../../../../Styles/tables'
import { Circle } from '../../../../Styles/project'

import { url } from '../../../utils/axios'



const ProjHistory = ({project,history}) => {
    // const [overCard, setOvercard] = useState(false)


	const pushToSprint =(id)=>{
		history.push(`/projects/${project.crypt+'/'+id}`)
	}
    return(
   	 <div className={styles.history}>
		<div className={styles.title__history}>
			<div className={styles.title__info} >
					<img alt='info'  src='/info.png' style={{marginRight:'10px'}} ></img>
					<Thin size='22'>История проекта</Thin>
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
		<div >
			<NEW_TABLE className={styles.history_table2} >
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
					
						return (
              <NEW_TR onClick={() => pushToSprint(sprint._id)} key={i}>
                <NEW_TD size="14" className={styles.tdd}>
                  {sprint.tasks.length -
                    sprint.tasks.filter((task) => task.taskStatus).length ===
                  0 ? (
                    <Circle color="#6DD66B" />
                  ) : (
                    <Circle color="#DD5757" />
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
                          ></Tag>
                        );
                      })
                    : ""}
                </NEW_TD>
                <NEW_TD className={styles.history_creator} size="14">
                  {" "}
                  {sprint.creator === undefined
                    ? "нет"
                    : sprint.creator.fullname}
                  <img
                    alt="lupa"
                    className={sprintcss.img__td}
                    style={{ opacity: sprint.creator === undefined ? 0 : 1 }}
                    src={
                      sprint.creator === undefined
                        ? "/Ellipse 13.png"
                        : url + "/" + sprint.creator.avatar
                    }
                  ></img>
                </NEW_TD>
                <NEW_TD size="14">
                  {sprint.tasks !== undefined
                    ? sprint.tasks.filter((task) => task.taskStatus).length +
                      "/" +
                      sprint.tasks.length
                    : ""}
                  <div className={sprintcss.card__thing}>
                    <div
                      style={{
                        width: `${Math.trunc(
                          (sprint.tasks !== undefined
                            ? sprint.tasks.filter((task) => task.taskStatus)
                                .length / sprint.tasks.length
                            : "") * 100
                        )}%`,
                      }}
                      className={sprintcss.card__thing__full}
                    ></div>
                  </div>
                </NEW_TD>
                <NEW_TD className={styles.off} size="14">
                  нет
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