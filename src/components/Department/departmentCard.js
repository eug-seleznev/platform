

import { useDispatch } from "react-redux";




import styles from '../../Styles/modules/department/departmentCard.module.css'


import { Bold} from '../../Styles/typography'


import {deleteDepartment, joinDepartment} from '../../redux/actions/department';
import Confirm from './confirm'
import { useEffect, useState } from 'react';
import UserCard from '../User/components/userCard'
import { allUsers } from '../../redux/actions/user';
import { loadUser } from '../../redux/actions/auth';
import ProjectsCard from '../Main/projectsCard';

const DepartmentCard = ({itsAllDepsPage, department, user, history,mydep}) => {



const dispatch = useDispatch()
const content = department
//const member = user.division && user.division.divname==content.divname
// const usersArr = users.filter(item => item.division? item.division.divname== content.divname : false)
//const usersArr = content.members


let projArray = []
const [newArr, setNewArr] = useState([])
const [lastArr, setLastArr] = useState(null)

const [pageStatus, setPageStatus] =useState(false)
const [showConfirm, setShowConfirm] = useState(false)

    
    // useEffect(()=>{
    //     if(content!=undefined&&content!==null) {
    //        dispatch(findDepartment(content.divname))
           
    //     }
        
    // },[content])
    // const join =()=>{
    //     dispatch(joinDepartment(department.divname))
     
    // }
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
            <Bold className={styles.title} title={pageStatus?'Открыть отдел':''} onClick={()=>departStatus()} style={{cursor: `${itsAllDepsPage?'pointer':'default'}`, display:`${mydep?'none':'block'}`}} size='30'>{department!==null?department.divname:''}</Bold>
            {/* {button?
                 <Bold className={styles.joinBtn}  size='16px' color='#3F496C' onClick={()=>setShowConfirm(true)}>Выйти из отдела</Bold>:
                 <Bold className={styles.joinBtn}  size='16px' color='#3F496C' onClick={join}>Присоединиться к отделу</Bold>
       
            } */}
                <div className={styles.members}>
            {department!==null?<div style={{display:`${department.members.length!==0?'none':'block'}`}}>В этом отделе нет сотрудников</div>:''}
           
            {department===null?'':department.members.map((el,i)=>{
               
                        return(
                            
                            <UserCard key={i} user={el} history={history}/>

                        )
                    }) 
                }
                
            </div>
            <Bold className={styles.activeTitle}  size='30'>Проекты отдела</Bold>
            <div className={styles.activeProjects}>

                {lastArr===null||lastArr===undefined||department.members.length===0?<div>У этого отдела нет проектов</div>:lastArr.map((el,i)=>{
                    
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