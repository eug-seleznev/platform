import { Button,CancelButton } from "../../../Styles/buttons"
import { Bold, Regular, Thin } from "../../../Styles/typography"
import{	useState, useEffect} from 'react'
import { useForm, useFieldArray } from "react-hook-form";
import {  addTasks,addInfoSprint,addSprint,getSprint, getProject} from "../../../redux/actions/projects";
import { useDispatch,useSelector} from "react-redux"
import style from '../../../Styles/modules/components/Project/sprintForm.module.css'

const SprintForm = ({smallTitles, buttonTitle, offWindow}) => {
	// Отправка описания и даты окончания
	const project = useSelector(state => state.projects.project)
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
			date:``
			 
		}
	  )

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
		setFormData({ ...formData, [e.target.name]:  e.target.value=='нет'?'':editedYY +'-'+editedMM+'-'+editedDD})
		
	 }
	 	// useEffect(()=>{
		// 	console.log(sprintData)
		//  },[sprintData])
	//   useEffect(()=>{
	// 	console.log(formData)
	//   },[formData])
	  const onChange2 = e => {
		e.preventDefault(); 
		// console.log (e.target.value)
		setFormData({ ...formData, [e.target.name]: e.target.value });
	 }
	 	const enter =()=>{
			 setEnterWin(true)
		 }
		const onSubmit = (data)=> {
			// console.log(data)
					
					setTimeout(() => {
						dispatch(addSprint(project.crypt,formData,data))
						offWindow ()
					}, 500);
					setTimeout(() => {
							dispatch(getProject(project.crypt))
							
						}, 700);
	
			}
	
		const cancel =()=>{
			offWindow()
		}


	return (
	<>
		{/* {!loaded?<div>loading...</div>:( */}
			<form className={style.formContain} onSubmit={handleSubmit(onSubmit)}>
			
					<div onMouseEnter={enter}>
						<div className={style.row}>
							<div className={style.line}>
								<Bold className={style.small__title}   size={16}>{smallTitles[0]}</Bold>
								<textarea
								className={style.textarea}	
									type='text'
									name="description"
									value={description}
									onChange={e => onChange2(e)}>  
								</textarea>
							</div>
							<div className={style.line2}>
								<Bold  className={style.small__title} size={16}>{smallTitles[1]}</Bold>
								<select defaultValue='нет' name="date"className={style.select} onChange={e => onChangeDate(e)}>
										<option value='нет'>нет</option>
										<option>1 неделя</option>
										<option>2 недели</option>
								</select>
							</div>
						</div>
							<div  >
							<div style={{ overflowY:`${fields.length<6?'hidden':'scroll'}`}} className={style.taskContain}>
								<ul style={{padding:0,listStyleType:'none'}}>

									{fields.map((item, index) => (
									<li key={item.id}  style={{display:'flex'}}>
										<div style={{fontSize:'20px',marginRight:'10px'}}>{index+1}</div>
										<input
										style={{marginRight:'40px'}}
										className={style.taskDescr}
										name={`tasks[${index}].taskTitle`}
										ref={register()}
										placeholder="Описание задачи" // make sure to set up defaultValue
										/>
									 <input
										type="number"
										defaultValue={0}
											name={`tasks[${index}].workVolume`}
											ref={register()}
											style={{display:'none'}}
											placeholder="Объем в часах" 
											/>
										 <input
										type="boolean"
										defaultValue={false}
											name={`tasks[${index}].taskState`}
											ref={register()}
											style={{display:'none'}}
											placeholder="Стейт" 
											/>
										<Button type="button" style={{display: `${fields.length===index+1?'none':'block'}`,
											color:'#3F496C',
											backgroundColor:'white',
											border:'none',
											
											}} onClick={() => remove(index)}>Удалить</Button>
										
										<Button
											type="button"
											style={{
												
												color:'#3F496C',
												display: `${fields.length!=index+1?'none':'block'}`,
												backgroundColor:'white',
												border:'none'}}
											onClick={() => append({ firstName: "appendBill", lastName: "appendLuo" })}
										>
											Добавить задачу
										</Button>
									</li>
									))}
								</ul>
								
								</div>
								</div>
								
						
					</div>
					
					<div className={style.buttons}>
						<CancelButton  className={style.button} fontSize={'16px'} grey onClick={cancel}>Отмена</CancelButton>
						<Button className={style.button} type="submit"fontSize={'16px'} >{buttonTitle}</Button>
					</div>
			
			</form>
			
		{/* )} */}
		</>
	)
}
export default SprintForm