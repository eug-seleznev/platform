import { NEW_TABLE, NEW_TBODY, NEW_TD, NEW_TH, NEW_THEAD, NEW_TR } from "../../Styles/tables"
import style from "../../Styles/modules/main/mytasks.module.css"
import getDate from "../Projects/getDate"
import { Bold, Light, Regular } from "../../Styles/typography"

import { ButtonTextDiv, ButtonTextLight } from "../../Styles/buttons"
import { useState } from "react"


const TaskHistory = ({tasks, pushToProject, typeFilter, delTask,onPressEnter}) => {
	const [id, setId] = useState('')
	const onPressEscape =()=>{
		setId('')
	
	}
	return (
		<NEW_TABLE style={{width:'100%'}} >
			
			<NEW_THEAD>
				<NEW_TR  className={style.mytask__tr__nohover}>
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
								{task.tasks.filter(task=>task.taskStatus && 
									typeFilter==='Все'?task.taskTitle:
									typeFilter==='Мои задачи'?!task.project:
									typeFilter==='Проектные задачи'?task.project:'')
									.map((task, i)=>{
									
									return(
										<NEW_TR 
											key={i} 
											onClick={()=>setId(task._id)}
											style={{outline:'none',backgroundColor:`${id===task._id?'#F1EFEF':''}`}}
										 	className={style.mytask__tr}
											tabIndex="0"
											onKeyDown={(e)=>e.key==='Delete'?delTask(task._id):e.key==='Enter'?onPressEnter(task._id):e.key==='Escape'?onPressEscape():''}>
											
											<NEW_TD style={{display:'flex',alignItems:'center'}}
											
												>
											{/* <input
												type="checkbox"
												
												checked={true}
												value={task._id}
												name={task.sprint}
												onChange={onChange}
											></input> */}
												<Regular style={{marginLeft:'10px'}}>{task.taskTitle}</Regular>
												<ButtonTextDiv onClick={()=>onPressEnter(task._id)} style={{visibility: `${id===task._id?'visible':'hidden'}`, marginLeft:'10px'}}  fontSize="12px">Восстановить</ButtonTextDiv>
												<ButtonTextDiv onClick={()=>onPressEnter(task._id)} style={{visibility: `${id===task._id&&!task.project?'visible':'hidden'}`, marginLeft:'10px'}}  fontSize="12px">Удалить</ButtonTextDiv>
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