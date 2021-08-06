import { Bold, Thin } from "../../../../Styles/typography"
import style from '../../../../Styles/modules/components/Project/editproj.module.css'
import { useDispatch } from "react-redux"
import { addToProject, changeUserPropertiesProj } from "../../../../redux/actions/projects"

import {CancelButton } from "../../../../Styles/buttons"
import { useState } from "react"
import { url } from "../../../utils/axios"
import Search from "../../../User/Search"
import UserTable from "../../../User/userTable"
import { useEffect } from "react/cjs/react.development"

const ProjTeamEdit = ({project}) => {
    const dispatch = useDispatch()
	const [invite,setInvite] = useState(false)
	const [task,setTask] = useState('')
	const [position,setPosition] = useState('')
	const [currentId,setCurrentId] = useState('')
	const deliteUser =(userId)=>{
		
		dispatch(addToProject (project.crypt,userId))
	
	}
	const press =(e)=>{
		if(e.key==='Enter') {
			e.target.blur()
		}
	}
	const changeSome =(prop, el, e)=>{
		
		
		setCurrentId(el._id)
		if(prop==='position') {
			setPosition(e.target.value)
			task===''&&setTask(el.task)
		}
		else if(prop==='task') {
			setTask(e.target.value)
			position===''&&setPosition(el.position)
		}
		// console.log(ready,el)
		let ready = prop==='position'?task:position
		dispatch(changeUserPropertiesProj (ready,prop,project.crypt,el.user._id,e.target.value))
	}
	// useEffect(()=>{
	// 	setPosition('')
	// 	setTask('')
	// },[currentId])
    return(
		<div>
		<div className={style.table} style={{marginTop:'50px'}}>
			<table style={{borderCollapse:'collapse'}}>
				<thead className={style.table__head}>
					<tr >
						<th className={style.off__too}><Thin size='14'>Раздел</Thin></th>
						<th className={style.off__too}><Thin size='14'>Имя</Thin></th>
						<th className={style.off}><Thin size='14'>Отдел</Thin></th>
						<th className={style.off__too}><Thin size='14'>Телефон</Thin></th>
						<th className={style.email}><Thin  size='14'>E-mail</Thin></th>
						<th className={style.off__too}><Thin  size='14'>Должность на проекте</Thin></th>
						<th className={style.off__too}></th>
						<th className={style.off}></th>
						
					</tr>
				</thead>
				<tbody>
					{project!==undefined?project.team2.map((el,i)=>{
						return(
						<tr key={i}>
								<td  className={style.off__too}>
									<input 
										onKeyDown={press} 
										className={style.hiddenInput} 
										defaultValue={el.task}  
										onChange={(e)=>changeSome('task', el, e)} size='14'>
									</input>
								</td>
								<td ><Thin size='14'>{el.user.fullname}</Thin></td>
								<td  className={style.off}><Thin size='14'>{el.user.position}</Thin></td>
								<td  className={style.off__too}><Thin size='14'>{el.user.phone}</Thin></td>
								<td   className={style.email}><Thin size='14'>{el.user.email}</Thin></td>					
								<td   className={style.off__too} >
									<input 
										onKeyDown={press} 
										className={style.hiddenInput} 
										defaultValue={el.position} 
										onChange={(e)=>changeSome('position', el, e)} size='14'>
									</input>
								</td>	
								<td><CancelButton style={{backgroundColor:'white', border:'none',color:'black'}} size='20' onClick={()=>deliteUser(el.user._id)} key={i}>Удалить из команды</CancelButton></td>
								<td className={style.off}><img alt='нет' src={url+'/'+el.user.avatar} className={style.image}></img></td>
						</tr>
						
						)
						
					}):''}
					<tr >
						<CancelButton onClick={()=>{setInvite(true)}} fontSize='14px' style={{padding:'20px',paddingTop:'10px',backgroundColor:'white', color:'#397BB8', border:'none',marginTop:'10px', width:'fit-content',textAlign:'start'}}>Пригласить в команду</CancelButton>
						</tr>
					
				</tbody>
				
			</table>
			
		</div>
		<div className={style.table} style={{display:`${invite?'flex':'none'}`,marginTop:'50px'}}>
			<Search project={project} />
			<UserTable project={project} crypt={project.crypt}/>
		</div>
		
		</div>
    )
}
export default ProjTeamEdit