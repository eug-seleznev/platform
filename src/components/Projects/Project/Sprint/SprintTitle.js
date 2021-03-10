import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addTask, addTasks, EditSprint } from "../../../../redux/actions/projects";
import style from "../../../../Styles/modules/components/Project/oneproj.module.css";
import { Bold, Light } from "../../../../Styles/typography";







const SprintTitle = ({sprint, prTitle, title, id}) => {
	const dispatch = useDispatch()
	// const [actualClose, setActualClose] = useState ('??')
    // const [diff, setDiff] = useState ('??')
	
	//sprint name handlers
	const [sprintInfo, setSprintTitle] = useState({
    	title: title,
  });

	const [editTitle, setEditTitle] = useState(false)

	const onChange = (e) => {
		setSprintTitle({title: e.target.value})
		dispatch(EditSprint(sprintInfo, id));

	}

	const onSubmit = (e) => {
		e.preventDefault()
		dispatch(EditSprint(sprintInfo, id))
		setEditTitle(false)
	}


	// useEffect(()=>{		
	// 	if(sprint.dateClosePlan!==undefined) {
	// 	   setActualClose(sprint.dateClosePlan.slice(5, 10).split('-').reverse().join('.'))
	// 	}
	//   },[sprint])


	//   useEffect (()=> {
	   
	// 	if (actualClose!=='??'){
	// 	  let d1 = new Date ()
	// 	  let d2 = new Date (sprint.dateClosePlan)
	// 	  console.log(d2, d1)
	// 	  setDiff (Math.abs(d2-d1)/86400000)}
	// 	},[actualClose])
   
    return (
      <div>
        <div className={style.title}>
          {!editTitle ? (
            <Bold size="24" onClick={() => setEditTitle(true)}>
              {sprintInfo.title}
            </Bold>
          ) : (
            <form onSubmit={onSubmit}>
              <input onChange={onChange} value={sprintInfo.title}></input>
            </form>
          )}

          <Bold color="#3F496C">{prTitle}</Bold>
        </div>
        <Light
          className={style.title__small}
          style={{ marginBottom: "70px" }}
          size="16"
        >
          <div className={style.title__deadline}>
            {/* Дней до дедлайна: {diff.toString().slice(0, 2)} */}
          </div>
        </Light>
      </div>
    );
}



export default SprintTitle