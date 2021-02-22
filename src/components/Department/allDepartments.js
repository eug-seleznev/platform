import styles from '../../Styles/modules/department/index.module.css'
import Profile from '../Main/profileComponent'
import {useSelector, useDispatch} from 'react-redux'
import { allDepartments } from '../../redux/actions/department'

import { useEffect, useState } from 'react'
import DepartmentCard from './departmentCard'
import { allUsers } from '../../redux/actions/user'
import { ButtonText } from '../../Styles/buttons'
import { Regular } from '../../Styles/typography'

const AllDepartments = ({history}) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const users = useSelector(state => state.users.users)
    const department = useSelector(state => state.departments.findDep)
    const allDeps = useSelector(state => state.departments.departments)
 useEffect(()=>{
    dispatch(allDepartments())
    dispatch(allUsers('name', true))
 },[])
 useEffect (()=>{
    if(allDeps){
        console.log (allDeps)
    }
 },[allDeps])
    return(
        <div className={styles.container}>
        

        {allDeps!==null&&allDeps!==undefined?allDeps.map((el)=>{
            return (
                <DepartmentCard itsAllDepsPage={true} department={el} user={user} history={history} users={users}/>
            )
        }):''}
            

        
        </div>
    )
}
export default AllDepartments