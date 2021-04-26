
import style from '../../../../Styles/modules/components/Project/editproj.module.css'
import table from '../../../../Styles/modules/components/Project/allproj.module.css'

import { useDispatch, useSelector } from "react-redux"
import { addToProject, changeUserPropertiesProj, joinTeam } from "../../../../redux/actions/projects"
import UserForm from '../../components/OneProject/infoForm';
import {CancelButton } from "../../../../Styles/buttons"
import { useEffect, useState } from "react"
import { url } from "../../../utils/axios"
import Search from "../../../User/Search"
import UserTable from "../../../User/userTable"
import { NEW_TABLE, NEW_TBODY, NEW_TD, NEW_TH, NEW_THEAD, NEW_TR } from "../../../../Styles/tables"
import Subtitle from '../../components/OneProject/subtitle'
import { Path } from '../../../Layout/header';

const ProjectTeam = () => {
    const dispatch = useDispatch()
    const permission = useSelector(state => state.auth.user.permission)
    const project = useSelector(state => state.projects.project)  
    const userId = useSelector(state => state.auth.user._id)
    const id = useSelector(state => state.projects.project.crypt)
    const [idArray] = useState([])
    const [button,setButton] = useState(false)
    const [open,setOpen] = useState(true)
    const [modal,setModal] = useState(false)



	const [invite,setInvite] = useState(false)
	const deliteUser =(userId)=>{
		dispatch(addToProject (project.crypt,userId))
	}
	const changeSome =(prop, el, e)=>{
		let val = e.target.value
		let ready = prop==='position'?el.task:el.position
		dispatch(changeUserPropertiesProj (ready,prop,project.crypt,el.user._id,val))
	}
    useEffect(()=>{     
        project.team2.map((el)=>{
          // console.log(el.user._id,userId)
          setButton(el.user._id===userId)
          idArray.push(el._id)
        })   
    },[])

    const hadleTeam =()=>{
      if(button) { 
        dispatch(joinTeam(id))
        setButton(!button)
      }
      
      if(!button) {
       setModal(true)
      }
    }
    const teamInfo = (formData) => {
        dispatch(joinTeam(id,formData))
        setModal(false)
        setButton(!button)  
    }

    const openfunc=()=>{
      setOpen(!open)
    }
    return(
		<div>
		    <div style={{ border:'none' }}>
                <div style={{display:'flex', alignItems:'center'}}>
                <Subtitle title='Команда проекта' isopen={open}
                    openfunc={openfunc} 
                    src={Path+'team.png'}
                    open={true} 
                    srcplus={button} 
                    buttonFunc={hadleTeam} 
                    subtwidth='90%' 
                >
                </Subtitle> 
                <div style={{display:`${modal?'block':'none'}`}}>
                <UserForm setModal={setModal} teamInfo={teamInfo}/>
                </div> 
            </div>
			<NEW_TABLE style={{borderCollapse:'collapse',color:'#3F496C'}}>
				<NEW_THEAD >
					<NEW_TR  className={table.first} >
						<NEW_TH className={style.off__too} style={{textAlign:'left'}}>Раздел</NEW_TH>
						<NEW_TH className={style.off__too}>Имя</NEW_TH>
						<NEW_TH className={style.off}>Отдел</NEW_TH>
						<NEW_TH className={style.off__too}>Телефон</NEW_TH>
						<NEW_TH  className={style.email}>E-mail</NEW_TH>
						<NEW_TH className={style.off__too}>Должность на проекте</NEW_TH>
						<NEW_TH className={style.off__too}></NEW_TH>
						<NEW_TH className={style.off}></NEW_TH>
						
					</NEW_TR>
				</NEW_THEAD>
				<NEW_TBODY >
					{project!==undefined?project.team2.map((el,i)=>{
						return(
						<NEW_TR key={i}>
								<NEW_TD  className={style.off__too} style={{textAlign:'center'}}>{permission==='admin'?<input className={style.hiddenInput} defaultValue={el.task} onChange={(e)=>changeSome('task', el, e)} size='14'></input>:el.task}</NEW_TD>
								<NEW_TD >{el.user.fullname}</NEW_TD>
								<NEW_TD  className={style.off}>{el.user.position}</NEW_TD>
								<NEW_TD  className={style.off__too}>{el.user.phone}</NEW_TD>
								<NEW_TD   className={style.email}>{el.user.email}</NEW_TD>					
								<NEW_TD   className={style.off__too} >{permission==='admin'?<input  className={style.hiddenInput} defaultValue={el.position} onChange={(e)=>changeSome('position', el, e)} size='14'></input>:el.position}</NEW_TD>	
								<NEW_TD>{permission==='admin'?<CancelButton style={{background:'none', border:'none',color:'black'}} size='20' onClick={()=>deliteUser(el.user._id)} key={i}>Удалить из команды</CancelButton>:''}</NEW_TD>
								<NEW_TD className={style.off}><img alt='нет' src={url+'/'+el.user.avatar} className={style.image}></img></NEW_TD>
						</NEW_TR>
						)
					}):''}
					<NEW_TR className={table.first}>
                        
                        <CancelButton onClick={hadleTeam} fontSize='14px' style={{paddingBottom:'10px',paddingTop:'10px',background:'none', color:'#397BB8', border:'none',marginTop:'10px',textAlign:'left'}}>{button?'Выйти из команды':'Вступить в команду'} </CancelButton>
                    </NEW_TR>
                    <NEW_TR className={table.first}>
                        {permission==='admin'?<CancelButton onClick={()=>{setInvite(true)}} fontSize='14px' style={{padding:'20px',paddingTop:'10px',background:'none', color:'#397BB8', border:'none',marginTop:'10px', width:'fit-content',textAlign:'start'}}>Пригласить в команду</CancelButton>:''}
                    </NEW_TR>       
  
					
					
				</NEW_TBODY>
				
			</NEW_TABLE>
			
		</div>
		<div className={style.table} style={{display:`${invite?'flex':'none'}`,marginTop:'50px'}}>
			<Search project={project} />
			<UserTable project={project} crypt={project.crypt}/>
		</div>
		
		</div>
    )
}
export default ProjectTeam
