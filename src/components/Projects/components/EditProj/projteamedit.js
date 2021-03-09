import { Bold, Thin } from "../../../../Styles/typography"
import style from '../../../../Styles/modules/components/Project/editproj.module.css'
import styles from '../../../../Styles/modules/components/proposesCard.module.css'
import { useDispatch } from "react-redux"
import { addToProject } from "../../../../redux/actions/projects"
import { Table, Td, Tr } from "../../../../Styles/tables"
import { Button, CancelButton } from "../../../../Styles/buttons"
import { useState } from "react"
import { url } from "../../../utils/axios"
import Search from "../../../User/Search"
import UserTable from "../../../User/userTable"

const ProjTeamEdit = ({project}) => {
    const dispatch = useDispatch()

	const deliteUser =(userId)=>{
		console.log(project.crypt)
		dispatch(addToProject (project.crypt,userId))
	
	}

    return(
		<div>
		<div className={style.table} style={{marginTop:'50px'}}>
			<table style={{borderCollapse:'collapse'}}>
				<thead className={style.table__head}>
					<tr>
						<th className={style.off__too}><Thin size='14'>Раздел</Thin></th>
						<th className={style.off__too}><Thin size='14'>Имя</Thin></th>
						<th className={style.off}><Thin size='14'>Отдел</Thin></th>
						<th className={style.off__too}><Thin size='14'>Телефон</Thin></th>
						<th className={style.off}><Thin  size='14'>E-mail</Thin></th>
						<th className={style.off__too}><Thin  size='14'>Должность на проекте</Thin></th>
						<th className={style.off__too}></th>
						<th className={style.off}></th>
						
					</tr>
				</thead>
				<tbody>
					{project!==undefined?project.team2.map((el,i)=>{
						return(
						<tr key={i}>
								<td  className={style.off__too}><Bold size='14'>{el.task}</Bold></td>
								<td ><Thin size='14'>{el.user.fullname}</Thin></td>
								<td  className={style.off}><Thin size='14'>{el.user.position}</Thin></td>
								<td  className={style.off__too}><Thin size='14'>{el.user.phone}</Thin></td>
								<td   className={style.off}><Thin size='14'>{el.user.email}</Thin></td>					
								<td   className={style.off__too}><Thin size='14'>{el.position}</Thin></td>	
								<td><CancelButton style={{backgroundColor:'white', border:'none',color:'black'}} size='20' onClick={()=>deliteUser(el.user._id)} key={i}>Удалить из команды</CancelButton></td>
								<td className={style.off}><img src={url+'/'+el.user.avatar} className={style.image}></img></td>
						</tr>
						
						)
						
					}):''}
					<tr >
						<CancelButton fontSize='14px' style={{padding:'20px',paddingTop:'10px',backgroundColor:'white', color:'#397BB8', border:'none',marginTop:'10px', width:'fit-content'}}>Пригласить в команду</CancelButton>
						</tr>
					
				</tbody>
				
			</table>
			
		</div>
		<div className={style.table} style={{display:'flex',marginTop:'50px'}}>
			<Search/>
			<UserTable crypt={project.crypt}/>
		</div>
		
		</div>
    )
}
export default ProjTeamEdit