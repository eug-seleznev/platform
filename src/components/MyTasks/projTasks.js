
import { useDispatch} from "react-redux"
import { NEW_TABLE, NEW_TH, NEW_THEAD, NEW_TR } from "../../Styles/tables"

import TaskDone from "./components/projTasks/done"
import InWork from "./components/projTasks/inWork"
import style from "../../Styles/modules/main/mytasks.module.css"


const ProjTasks =({tasks, history, month,onChange})=>{
	
	

	const pushToProject =(link)=>{
		history.push(`./projects/${link}`)
	}
	return(
		<>
		<NEW_TABLE style={{width:'100%'}}>
		<NEW_THEAD>
			<NEW_TR className={style.mytask__tr}>
				<NEW_TH>Задача</NEW_TH>
				<NEW_TH className={style.deadline}>Дедлайн</NEW_TH>
				<NEW_TH className={style.mobile__resize}>Проект</NEW_TH>
				<NEW_TH className={style.mobile__resize}>Назначил</NEW_TH>
			</NEW_TR>
		</NEW_THEAD>
			<InWork onChange={onChange} tasks={tasks} pushToProject={pushToProject}/>
			<TaskDone onChange={onChange} month={month} tasks={tasks} pushToProject={pushToProject}/>
		</NEW_TABLE>
		</>
			
	
		
	)
}
export default ProjTasks