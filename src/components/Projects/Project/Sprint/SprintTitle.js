import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addTask, addTasks } from "../../../../redux/actions/projects";
import style from "../../../../Styles/modules/components/Project/oneproj.module.css";
import { Bold, Light } from "../../../../Styles/typography";







const SprintTitle = ({sprint, prTitle}) => {
	const [actualClose, setActualClose] = useState ('??')
    const [diff, setDiff] = useState ('??')
	useEffect(()=>{
		console.log(sprint)
		
		if(sprint.dateClosePlan!==undefined) {
		   setActualClose(sprint.dateClosePlan.slice(5, 10).split('-').reverse().join('.'))
		}
	   
	  },[sprint])
	  useEffect (()=> {
	   
		if (actualClose!=='??'){
		  let d1 = new Date ()
		  let d2 = new Date (sprint.dateClosePlan)
		  console.log(d2, d1)
		  setDiff (Math.abs(d2-d1)/86400000)}
		},[actualClose])
   
    return (<>
		{sprint.dateOpen===undefined?<div>loading..</div>:
		<div>
				<div className={style.title}>
					<Bold size="24">
					Спринт 
					{sprint.dateOpen.slice(5, 10).split('-').reverse().join('.') + "-"+actualClose}
					</Bold>
					<Bold color='#3F496C'>{prTitle}</Bold>
				</div>
				 <Light
				 className={style.title__small}
				 style={{ marginBottom: "70px" }}
				 size="16"
			   >
				 
				   <div className={style.title__deadline}>
					 Дней до дедлайна: {diff.toString().slice(0, 2)}
				   </div>
			
			   </Light>
			</div>
		}
		</>
    )
}



export default SprintTitle