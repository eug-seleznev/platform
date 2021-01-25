import { Button } from "../../../Styles/buttons"
import { Thin } from "../../../Styles/typography"
import{	useState, useEffect} from 'react'
import { useForm, useFieldArray } from "react-hook-form";
import {  addTasks,addInfoSprint,addSprint} from "../../../redux/actions/projects";
import { useDispatch,useSelector} from "react-redux"
import style from '../../../Styles/modules/components/Project/sprintForm.module.css'

const SprintForm = ({smallTitles, buttonTitle, offWindow}) => {
	// Отправка описания и даты окончания
	const reload = useSelector(state => state.projects.reload)
	const project = useSelector(state => state.projects.project)
	const sprint = useSelector(state => state.projects.sprint)
	const dispatch = useDispatch();
	const { register, control, handleSubmit } = useForm({
        defaultValues: {
            tasks: [{ taskTitle: "задача", workVolume: "5", taskState: false }],
            
          }
	});
	const { fields,append,remove,} = useFieldArray({
		control, 
		name: "tasks", 
	  });
	const [formData, setFormData] = useState(
		{
			description: ``, 
			date: 0,  
			 
		}
	  )
	  const [sprintData,setSprintData] = useState (0)
	  const [enterWin,setEnterWin] =useState (false)
	  const {description, date} = formData;
	  //

	  
	  

	  const onChangeDate = (e) => {
		let today = new Date();
		let chose = e.target.value == '2 недели'?14:7
		let dd = String(today.getDate()+chose).padStart(2, '0');
		let mm = String(today.getMonth() + 1).padStart(2, '0');
		let yyyy = today.getFullYear();
		let ddDiff = Number(dd)-31
		let mmDiff = Number(mm)+1
		let editedDD = dd> 31 ? '0' + ddDiff : dd >31&& ddDiff>10? ddDiff: dd
		let editedMM = dd> 31 && mm>=9?mmDiff: dd > 31 && mm<9 ? '0'+mmDiff : dd> 31 && mm===12?'01':mm
		let editedYY = dd> 31 && mm===12?yyyy+1:yyyy
		
		
		
		setFormData({ ...formData, [e.target.name]:  e.target.value=='нет'?0:editedYY +'-'+editedMM+'-'+editedDD})
		
	 }
	  useEffect(()=>{
		console.log(formData)
	  },[formData])
	  const onChange2 = e => {
		e.preventDefault(); 
		console.log (e.target.value)
		setFormData({ ...formData, [e.target.name]: e.target.value });
	 }
	 	const enter =()=>{
			 setEnterWin(true)
		 }
	const onSubmit = (data)=> {
		console.log(data)
				setSprintData(data)
				setTimeout(() => {
					dispatch(addSprint(project.crypt))
				}, 500);
				

		}
	useEffect(()=>{
		if(reload){
			let tasks = sprintData
			let sprintId = sprint.id	
				dispatch(addInfoSprint(sprintId, formData))
				dispatch(addTasks({tasks, sprintId }))
			
				setTimeout(() => {
					offWindow ()
				}, 300);
		}
		
	},[reload])
		

	return (
	<>
		{/* {!loaded?<div>loading...</div>:( */}
			<form className={style.formContain} onSubmit={handleSubmit(onSubmit)}>
			
					<div onMouseEnter={enter}>
						<Thin style={{marginTop:'40px'}} size={16}>{smallTitles[0]}</Thin>
						
						
							<input 
								style={{width:'100%'}}	
								type='text'
								name="description"
								value={description}
								
								
								onChange={e => onChange2(e)}>  
							</input>
							<div className={style.week} >
								<Thin size={16}>{smallTitles[1]}</Thin>
								<select name="date"className={style.select} onChange={e => onChangeDate(e)}>
										<option selected>нет</option>
										<option>1 неделя</option>
										<option>2 недели</option>
								</select>
							</div>
							<div style={{width:'31vw', overflowX:`${fields.length<3?'hidden':'visible'}`}}>
							<div className={style.taskContain}>
								<ul style={{padding:0,listStyleType:'none'}}>

									{fields.map((item, index) => (
									<li key={item.id} >
										<input
										
										className={style.taskDescr}
										name={`tasks[${index}].taskTitle`}
										ref={register()}
										placeholder="Описание задачи" // make sure to set up defaultValue
										/>
									
										
										<Button type="button" style={{display: `${fields.length===1?'none':'block'}`,
											color:'#3F496C',
											backgroundColor:'white',
											border:'none',
											width:'30vw',
											textAlign:'right'}} onClick={() => remove(index)}>Удалить</Button>
									</li>
									))}
								</ul>
								
								<Button
									type="button"
									style={{color:'#3F496C',
										backgroundColor:'white',
										border:'none',width:'30vw',
										textAlign:'right'}}
									onClick={() => append({ firstName: "appendBill", lastName: "appendLuo" })}
								>
									Добавить задачу
								</Button>
								</div>
								</div>
								
						
					</div>
					
					<div className={style.buttons}>
						<Button padd={'55px'} grey onClick={offWindow}>Отмена</Button>
						<Button type="submit" padd={'55px'}>{buttonTitle}</Button>
					</div>
			
			</form>
			
		{/* )} */}
		</>
	)
}
export default SprintForm