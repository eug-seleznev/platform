
import style from "../../../../Styles/modules/main/mytasks.module.css"

import { NEW_TBODY, NEW_TD, NEW_TR } from "../../../../Styles/tables"
import { url } from "../../../utils/axios"
import { ButtonTextLight } from "../../../../Styles/buttons"
import getDate from "../../../Projects/getDate"

import { Regular } from "../../../../Styles/typography"



const InWork =({tasks, onChange, pushToProject})=>{
	
	
	return(
			<NEW_TBODY>
				<NEW_TR className={style.mytask__tr__nohover}>
					<NEW_TD >В работе {tasks.filter(task=>task.project && !task.taskStatus).length===0?'нет задач':''}</NEW_TD>
				</NEW_TR>
				<NEW_TR className={style.mytask__tr__nohover}>
					<NEW_TD > </NEW_TD>
				</NEW_TR>
				{tasks.filter(task=>task.project && !task.taskStatus).map((task)=>{
					return(
						<NEW_TR key={task._id} className={style.mytask__tr}>
							<NEW_TD style={{display:'flex',alignItems:'center'}}>

							<input
								type="checkbox"
								defaultChecked={task.taskStatus}
								value={task._id}
								name={task.sprint}
								onChange={onChange}
							></input>
								<Regular
									size='14'
									// onClick={()=>setId(task._id)}
									style={{marginLeft:'15px'}}
									// onChange={(e)=>editHandler(e)}
								>{task.taskTitle}</Regular>
							</NEW_TD>
							<NEW_TD className={style.deadline}>
								{task.deadline && getDate(task.deadline)}
							</NEW_TD>
							<NEW_TD className={style.mobile__resize}>
								<ButtonTextLight style={{display:`${task.project?'block':'none'}`}} onClick={()=>pushToProject(task.project.crypt)}>{task.project ? task.project.title: ""}</ButtonTextLight>
							</NEW_TD>
							<NEW_TD className={style.user__td} >
								{task.user2? task.user2.fullname:'нет'}
								{task.user2? <img className={style.mytask__img} src={url+'/'+task.user2.avatar}></img> :''}
							</NEW_TD>
						</NEW_TR>
					)
				})}
			</NEW_TBODY>	

	)
}
export default InWork