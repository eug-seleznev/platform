import { useState } from "react";

import { useDispatch } from "react-redux";
import { allUsers } from "../../redux/actions/user";
import { loadUser } from "../../redux/actions/auth";
import { deleteDepartment } from "../../redux/actions/department";

import styles from '../../Styles/modules/department/departmentCard.module.css'
import { Bold } from '../../Styles/typography'

import UserCard from '../User/userCard'
import Confirm from "./confirm";

const DepartmentCard = ({ user, history, users}) => {



const dispatch = useDispatch()
const content=user.division
const usersArr = users.filter(item => item.division? item.division.divname== content.divname : false)

const [showConfirm, setShowConfirm] = useState(false)


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