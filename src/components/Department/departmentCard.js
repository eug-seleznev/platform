import { useState } from "react";

import { useDispatch } from "react-redux";
import { allUsers } from "../../redux/actions/user";
import { loadUser } from "../../redux/actions/auth";
import { deleteDepartment } from "../../redux/actions/department";

import styles from '../../Styles/modules/department/departmentCard.module.css'
import { Bold } from '../../Styles/typography'

import { Bold, Light } from '../../Styles/typography'
import { ButtonText } from '../../Styles/buttons'
import { useDispatch } from 'react-redux';
import { allDepartments, deleteDepartment, joinDepartment, findDepartment } from '../../redux/actions/department';
import Confirm from './confirm'
import { useEffect, useState } from 'react';
import UserCard from '../User/userCard'
import { allUsers } from '../../redux/actions/user';
import { loadUser } from '../../redux/actions/auth';
import ProjectsCard from '../Main/projectsCard';

const DepartmentCard = ({ department, user, history, users}) => {



const dispatch = useDispatch()
const content = user.division
const member = user.division && user.division.divname==content.divname
// const usersArr = users.filter(item => item.division? item.division.divname== content.divname : false)
const usersArr = content.members


let projArray = []
const [newArr, setNewArr] = useState([])
const [lastArr, setLastArr] = useState(null)
const [showConfirm, setShowConfirm] = useState(false)


    // const join = () => {
    //     dispatch(joinDepartment(content.divname))
    //     setTimeout(() => {
    //     dispatch(allUsers())
    //     dispatch(loadUser())
    // }, 100);
    // }
    useEffect(()=>{
        if(usersArr!=undefined) {
            usersArr.concat(user.projects);
           
        }
        
    },[usersArr])
    useEffect(()=>{
        if(content!=undefined) {
           dispatch(findDepartment(content.divname))
           
        }
        
    },[content])
    const pushToArray =(el)=>{
        projArray = projArray.concat(el.projects)
        newA()
    }
    const newA = ()=>{
        setNewArr (state => [...state, [...new Map(projArray.map(item => [item._id, item])).values()]]) 
        setLastArr (newArr[newArr.length-1])
    }
    useEffect(()=>{
       console.log(lastArr) 
    },[lastArr])
    
    useEffect(()=>{
        if (department!=null){
             department.members.map((el,i)=>{
                return pushToArray(el)
            }) 
        }
           
        
    },[department])
    
    useEffect(()=>{
        if(department!=null) {
          console.log(department)
           
        }
        
    },[department])
    const deleteDep = () => {
        dispatch(deleteDepartment(content.divname))
        setShowConfirm(false)
        setTimeout(() => {
            dispatch(allUsers())
            dispatch(loadUser())
        }, 100);
    }

    return(
        <div className={styles.container}>
            <Bold className={styles.title} size='30'>{content.divname}</Bold>
            <Bold className={styles.joinBtn} size='16px' color='#3F496C' onClick={()=>setShowConfirm(true)}>Выйти из отдела</Bold>
            <div className={styles.members}>
              

            {department==null?'':department.members.map((el,i)=>{
                // console.log(el.projects)
                return(
                    
                    <UserCard key={i} user={el} history={history}/>

                )
            })} 
            </div>
            <Bold className={styles.activeTitle}  size='30'>Проекты отдела</Bold>
            <div className={styles.activeProjects}>
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
    )
}
export default DepartmentCard