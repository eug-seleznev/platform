import { useDispatch, useSelector } from "react-redux"
import './user.css'
import styles from '../../Styles/modules/main/main.module.css'
import { url } from '../utils/axios';
import {Button} from '../../Styles/buttons'
import styled from 'styled-components'
import { useEffect, useState} from "react";
import {changeLoaded, loadUser} from '../../redux/actions/auth'
import { Card, SmallContainer, } from "../../Styles/common";
import { Bold } from '../../Styles/typography'

import  ProfileComponent  from '../Main/profileComponent'
import ProjectsCard from '../Main/projectsCard'


const MyProfile = ({match, history}) => {
    let {id} = match.params;
    const dispatch = useDispatch ()
    const loaded = useSelector(state => state.auth.loaded)
    const user = useSelector(state => state.auth.user)
    const [permission, setPermission] = useState('')
    useEffect (()=> {
        dispatch (loadUser())
    },[])
    useEffect(()=>{
        if (user!=undefined){
            console.log(user)
           setPermission(user.permission)
        } 
     },[user])
    return (
        <div className={styles.mainContainer}>

            <ProfileComponent user={user} history={history} change/>

            <div className={styles.projects}>
                    <Bold color='black' size='36' className={styles.myProj}>Мои проекты</Bold>

                    {user.projects.map((el,i)=>{
                        
                        return(
                            <ProjectsCard project={el} permission={permission} sprints={user.sprints} history={history}/>
                        )
                    })}
                    
            </div>

        </div>
    )
}



export default MyProfile