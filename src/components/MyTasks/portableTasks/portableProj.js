
// import { useDispatch} from "react-redux"
import { NEW_TABLE, NEW_TH, NEW_THEAD, NEW_TR} from "../../../Styles/tables"


import InWork from "./inWork"
import style from "../../../Styles/modules/main/mytasks.module.css"




const ProjTasks =({tasks, month,onChange,pushToProject})=>{
 	// const dispatch = useDispatch()
	

	return(
		<>
		
			
		
			
		<NEW_TABLE style={{width:'100%',background:'none'}}>
			<NEW_THEAD>
				<NEW_TR className={style.mytask__tr__nohover} >
					
				</NEW_TR>
			</NEW_THEAD>
			<InWork onChange={onChange} tasks={tasks} pushToProject={pushToProject}/>
		
		</NEW_TABLE>
		</>
			
	
		
	)
}
export default ProjTasks