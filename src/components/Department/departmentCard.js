

import { useDispatch } from "react-redux";




import styles from '../../Styles/modules/department/departmentCard.module.css'


import { Bold, Light } from '../../Styles/typography'
import { ButtonText } from '../../Styles/buttons'

import { allDepartments, deleteDepartment, joinDepartment, findDepartment } from '../../redux/actions/department';
import Confirm from './confirm'
import { useEffect, useState } from 'react';
import UserCard from '../User/components/userCard'
import { allUsers } from '../../redux/actions/user';
import { loadUser } from '../../redux/actions/auth';
import ProjectsCard from '../Main/projectsCard';

const DepartmentCard = ({itsAllDepsPage, department, user, history, users}) => {



const dispatch = useDispatch()
const content = user.division!==null?user.division:department
const member = user.division && user.division.divname==content.divname
// const usersArr = users.filter(item => item.division? item.division.divname== content.divname : false)
const usersArr = content.members


let projArray = []
const [newArr, setNewArr] = useState([])
const [lastArr, setLastArr] = useState(null)
const [pageStatus, setPageStatus] =useState(false)
const [showConfirm, setShowConfirm] = useState(false)
  
    useEffect(()=>{
        if(usersArr!=undefined) {
            usersArr.concat(user.projects);
           
        }
        
    },[usersArr])
    useEffect(()=>{
        if(content!=undefined&&content!==null) {
           dispatch(findDepartment(content.divname))
           
        }
        
    },[content])
    const pushToArray =(el)=>{
        projArray = projArray.concat(el.projects)
        newA()
        // console.log(projArray)
    }
    const newA = ()=>{
        setNewArr (state => [...state, [...new Map(projArray.map(item => [item._id, item])).values()]]) 
       
        // console.log(newArr)
    }
    useEffect(()=>{
        setLastArr (newArr[newArr.length-1])
    },[newArr])
   
    
    useEffect(()=>{
        if (department!=null){
             department.members.map((el,i)=>{
               
                return pushToArray(el)

            }) 
        }
           
        
    },[department])
    useEffect(()=>{
        setPageStatus(itsAllDepsPage)
    },[itsAllDepsPage])
    useEffect(()=>{
        if(department!=null) {
     
           
        }
    },[department])
    const deleteDep = () => {
        dispatch(deleteDepartment(content.divname))
        setShowConfirm(false)
        setTimeout(() => {
            dispatch(allUsers('name', true))
            dispatch(loadUser())
           
        }, 100);
    }
    const departStatus =()=>{
        if(itsAllDepsPage) {
            setPageStatus(!pageStatus)
        }
    }
    return(
        <div>
       <div className={styles.container} style={{height: `${pageStatus?'60px':'auto'}`,overflowY: `${pageStatus?'hidden':'visible'}`}}>
            <Bold className={styles.title} title={pageStatus?'Открыть отдел':''} onClick={()=>departStatus()} style={{cursor: `${itsAllDepsPage?'pointer':'default'}`}} size='30'>{department!==null?department.divname:''}</Bold>
            <Bold className={styles.joinBtn} style={{display:`${itsAllDepsPage?'none':'grid'}`}} size='16px' color='#3F496C' onClick={()=>setShowConfirm(true)}>Выйти из отдела</Bold>
            <div className={styles.members}>
            {department!==null?<div style={{display:`${department.members.length!==0?'none':'block'}`}}>В этом отделе нет сотрудников</div>:''}
           
            {department==null?'':department.members.map((el,i)=>{
               
                        return(
                            
                            <UserCard key={i} user={el} history={history}/>

                        )
                    }) 
                }
                
            </div>
            <Bold className={styles.activeTitle}  size='30'>Проекты отдела</Bold>
            <div className={styles.activeProjects}>
            <div style={{display:`${lastArr!==null&&lastArr!==undefined&&lastArr.length!==0?'none':'block'}`}}>У этого отдела нет проектов</div>
                {lastArr===null||lastArr===undefined?'':lastArr.map((el,i)=>{
                    
                    // if(el!=undefined){
                        return(
                        
                        <ProjectsCard key={i} project={el} history={history} sprints={user.sprints}/>
                    ) 
                    
                    // return(<div>loading..</div>)
                    
                })}
            </div>


            {showConfirm && <Confirm accept={()=>deleteDep()} decline={()=>setShowConfirm(false)} title={content.divname}/> }  


            </div>
        
       </div>
        
    )
}
export default DepartmentCard