import { NEW_TABLE, NEW_TBODY, NEW_TD, NEW_TH, NEW_THEAD, NEW_TR } from "../../Styles/tables"
import style from "../../Styles/modules/main/mytasks.module.css"
import getDate from "../Projects/getDate"
import { Bold, Light, Regular } from "../../Styles/typography"

import { ButtonTextLight } from "../../Styles/buttons"


const TaskHistory = ({tasks,onChange, pushToProject}) => {
	// useEffect(()=>{
	// 	console.log(tasks)
	// },[tasks])
	return (
		<NEW_TABLE style={{width:'100%'}} >
			
			<NEW_THEAD>
				<NEW_TR className={style.mytask__tr}>
					<NEW_TH>Задача</NEW_TH>
					<NEW_TH className={style.deadlineHistory}>Дата завершения <div>(план)</div></NEW_TH>
					<NEW_TH className={style.deadline}>Дата завершения <div className={style.deadlineHistory}>(фактическая)</div></NEW_TH>
					<NEW_TH className={style.project}>Проект</NEW_TH>
					<NEW_TH className={style.creator}>Назначил</NEW_TH>
					<NEW_TH  className={style.type}>Тип</NEW_TH>
				</NEW_TR>
			</NEW_THEAD>
			
				{tasks.map((year, i)=>{
					return(
						<>
						{year.month_tasks.length!==0?<Bold size='14' key={i} className={style.date2}>{year.year}</Bold>:''}
						{year.month_tasks.map((task,i)=>{
							return(
								<>
								{task.tasks.length!==0?<Light size='14' key={i} className={style.date2} color='#8C8C8C'>{task.month}</Light>:''}
								<NEW_TBODY>
								{task.tasks.filter(task=>task.taskStatus).map((task, i)=>{
									
									return(
										<NEW_TR className={style.mytask__tr} key={i}>
											
											<NEW_TD style={{display:'flex',alignItems:'center'}}>
											<input
												type="checkbox"
												
												checked={true}
												value={task._id}
												name={task.sprint}
												onChange={onChange}
											></input>
												<Regular style={{marginLeft:'10px'}}>{task.taskTitle}</Regular>
											</NEW_TD>
											<NEW_TD className={style.deadlineHistory}>{getDate(task.deadline)!="1 января 1970"?getDate(task.deadline):'нет'}</NEW_TD>
											<NEW_TD className={style.deadline}>{getDate(task.dateClose)}</NEW_TD>
											<NEW_TD className={style.project}>{task.project ?<ButtonTextLight  onClick={()=>pushToProject(task.project.crypt)}>{task.project.title}</ButtonTextLight>: '-'}</NEW_TD>
											<NEW_TD className={style.creator}>{task.user2&&task.project?task.user2.fullname: '-'}</NEW_TD>
											<NEW_TD className={style.type}>{task.project?"Задачи проекта": 'Мои задачи'}</NEW_TD>
										</NEW_TR>
									)
								}).reverse()}</NEW_TBODY>
								</>
							)
						}).reverse()}
						</>
						
					)
					
				})}
				
		</NEW_TABLE>
	)
    
}


export default TaskHistory