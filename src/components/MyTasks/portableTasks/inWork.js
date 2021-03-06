
import style from "../../../Styles/modules/main/mytasks.module.css"

import { NEW_TBODY, NEW_TD, NEW_TR } from "../../../Styles/tables"
// import { url } from "../../utils/axios"
import { ButtonTextLight } from "../../../Styles/buttons"
// import getDate from "../../Projects/getDate"

import { Light } from "../../../Styles/typography"
import { Link } from "react-router-dom"



const InWork =({tasks, onChange, pushToProject})=>{
	
	
	return(
			<NEW_TBODY>
				<NEW_TR className={style.mytask__tr__nohover}>
					<NEW_TD style={{color:'#8C8C8C',fontSize:'16px',paddingLeft:'20px'}}>В работе {tasks.filter(task=>task.project && !task.taskStatus).length===0?'нет задач':''}</NEW_TD>
				</NEW_TR>
				
				{tasks.filter(task=>task.project && !task.taskStatus).map((task)=>{
					return(
						<NEW_TR key={task._id} className={style.mytask__tr__nohover}>
							<NEW_TD style={{display:'flex', alignItems:'center',paddingLeft:'20px'}}>
										<div style={{filter:'invert(25%)'}}>
											<input
											type="checkbox"
											defaultChecked={task.taskStatus}
											value={task._id}
											
											onChange={onChange}
											></input>
										</div>
								<Light
									color='white'
									size='16'
									// onClick={()=>setId(task._id)}
									style={{marginLeft:'15px'}}
									// onChange={(e)=>editHandler(e)}
								>{task.taskTitle}</Light>
							</NEW_TD>
							
							<NEW_TD className={style.mobile__resize}>
								<Link to={`../../../../projects/${task.project.crypt}/main`}><ButtonTextLight style={{fontSize:'14px',color:'white',display:`${task.project?'block':'none'}`}}>{task.project ? task.project.title: ""}</ButtonTextLight></Link>
							</NEW_TD>
							
						</NEW_TR>
					)
				})}
			</NEW_TBODY>	

	)
}
export default InWork