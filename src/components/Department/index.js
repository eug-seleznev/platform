import styles from '../../Styles/modules/department/index.module.css'
import Profile from '../Main/profileComponent'
import {useSelector, useDispatch} from 'react-redux'
import { allDepartments, findDepartment} from '../../redux/actions/department'

import { useEffect, useState } from 'react'
import DepartmentCard from './departmentCard'
import { allUsers } from '../../redux/actions/user'
import { ButtonText } from '../../Styles/buttons'
import { Regular } from '../../Styles/typography'

const Department = ({history}) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const users = useSelector(state => state.users.users)
    const department = useSelector(state => state.departments.findDep)
    const allDeps = useSelector(state => state.departments.departments)
    const [load, setLoad] = useState (true)
 useEffect(()=>{
    dispatch(allDepartments())
    dispatch(allUsers('name', true))
    
 },[])
 useEffect(()=>{
    setTimeout(()=>{
        setLoad(true)
    },5000)
},[])
useEffect(()=>{
    if(user!==null&&user!==undefined) {
        if(user.division!==null) {
            dispatch(findDepartment(user.division.divname))
        }
    }
},[user])
    return(
        <div className={styles.container}>
            <Profile user={user} history={history}/>

        {user.division===null||department===null? <Regular size='16'>Вы не состоите ни в одном отделе, вступить можно на <ButtonText fontSize='18px' onClick={()=>history.replace('/edit')}>странице редактирования профиля</ButtonText> </Regular> :

            <DepartmentCard load={load} itsAllDepsPage={false} department={department} user={user} history={history} users={users}/>
  
        }
            

        
        </div>
    )
}
export default Department