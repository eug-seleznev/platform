import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {  addInfoSprint, EditSprint} from "../../../../redux/actions/projects";
import { Button, ButtonText } from "../../../../Styles/buttons";

import style from "../../../../Styles/modules/components/Project/oneproj.module.css";
import { Bold, Light, Regular } from "../../../../Styles/typography";
import getDate from "../../getDate";







const SprintTitle = ({sprint,user, prTitle,hist, title, id,date}) => {
	const dispatch = useDispatch()
	// const [actualClose, setActualClose] = useState ('??')
    // const [diff, setDiff] = useState ('??')
	
	//sprint name handlers
	const[dateIn, setDateIn] = useState ('нет')
	const [sprintInfo, setSprintTitle] = useState({
    	title: title,
  });
  const [sprintDate, setDate] = useState({
	date:'',
});
useEffect(()=>{
	console.log(sprint)
},[sprintDate])
useEffect(()=>{
	if(sprint.dateClosePlan!==undefined){
		let date = new Date (sprint.dateClosePlan)
		
	  	
		setDateIn(getDate(date)) 
	}
},[sprint])
	const [change, setChange] = useState(false)

	const onChange = (e) => {
		setSprintTitle({title: e.target.value})
		dispatch(EditSprint(sprintInfo, id));

	}
	useEffect(()=>{
		if(sprintInfo.title!=='') {
			dispatch(EditSprint(sprintInfo, id));
		}
	},[sprintInfo])
	const onChangeDate = (e) => {
		setDate({date: new Date(e.target.value)})
		
		dispatch(addInfoSprint(sprintDate, id));

	}
	useEffect(()=>{
		if(sprintDate.date!=='') {
			dispatch(addInfoSprint(sprintDate, id));
		}
	},[sprintDate])
	const onSubmit = (e) => {
		e.preventDefault()
		dispatch(EditSprint(sprintInfo, id))
		
	}
	const onSubmitDate = (e) => {
		e.preventDefault()
		dispatch(addInfoSprint(sprintInfo, id))
		
	}
	const toProj =()=>{
		hist.push('./')
	}
	const buttonR =()=>{
		setChange (false)
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
          {/* {!editTitle ? (
            <Bold size="24" onClick={() => setEditTitle(true)}>
              {sprintInfo.title}
            </Bold>
          ) : ( */}
		  
            <form onSubmit={onSubmit}>
              <input className={style.titleChange} onChange={onChange} value={sprintInfo.title}></input>
            </form>
        {/* //   )} */}
		
          <Bold color="#3F496C" className={style.link} onClick={toProj}>{prTitle}</Bold>
        </div>
        <Light
          className={style.title__small}
          style={{ marginBottom: "70px" }}
          size="16"
        >
			
          <div className={style.title__deadline}>
			<Regular>Дедлайн: </Regular>
			<Regular style={{display:`${change?'none':'flex'}`}}>{dateIn}</Regular>
			<ButtonText style={{display:`${change||user.permission==='user'?'none':'block'}`, marginLeft:'10px'}} onClick={()=>setChange (true)} >изменить</ButtonText>
		  	<form onSubmit={onSubmitDate} style={{display:`${!change?'none':'flex'}`}}>
              <input className={style.dateChange} onKeyPress={(e)=>e.key==='Enter'?buttonR():''} onChange={onChangeDate}  type='date'></input>
            </form>
          </div>
        </Light>
      </div>
    );
}

// эй ЖЕня .!.


export default SprintTitle