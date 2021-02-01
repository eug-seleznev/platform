import { url } from '../utils/axios';
import styles from '../../Styles/modules/department/departmentCard.module.css'

import { Bold, Light } from '../../Styles/typography'
import { ButtonText } from '../../Styles/buttons'
import { useDispatch } from 'react-redux';
import { allDepartments, deleteDepartment, joinDepartment } from '../../redux/actions/department';
import Confirm from './confirm'
import { useEffect, useState } from 'react';
import UserCard from '../User/userCard'
import { allUsers } from '../../redux/actions/user';
import { loadUser } from '../../redux/actions/auth';

const DepartmentCard = ({ user, history, users}) => {



const dispatch = useDispatch()
const content=user.division
const member = user.division && user.division.divname==content.divname
const usersArr = users.filter(item => item.division? item.division.divname== content.divname : false)

const [showConfirm, setShowConfirm] = useState(false)


    // const join = () => {
    //     dispatch(joinDepartment(content.divname))
    //     setTimeout(() => {
    //     dispatch(allUsers())
    //     dispatch(loadUser())
    // }, 100);
    // }

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
            <Bold className={styles.joinBtn}  size='16px' color='#3F496C' onClick={()=>setShowConfirm(true)}>Выйти из отдела</Bold>
            <div className={styles.members}>
              

                {usersArr && usersArr.map((el,i)=>{

                return(
                    
                    <UserCard user={el} history={history}/>
                )
                })} 
            </div>
            <Bold className={styles.activeTitle}  size='30'>Активные проекты</Bold>
            <div className={styles.activeProjects}>
                
                Development
                {/* {content.users.map((el,i_=>{

                return(
                    <ProjectCard user={el}/>
                )
                }))} */} 
            </div>


             {showConfirm && <Confirm accept={()=>deleteDep()} decline={()=>setShowConfirm(false)} title={content.divname}/> }  


        </div>
    )
}
export default DepartmentCard