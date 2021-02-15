import styles from '../../Styles/modules/department/index.module.css'
import Profile from '../Main/profileComponent'
import {useSelector, useDispatch} from 'react-redux'
import { allDepartments} from '../../redux/actions/department'

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

 useEffect(()=>{
    dispatch(allDepartments())
    dispatch(allUsers())
 },[])

    return(
        <div className={styles.container}>
            <Profile user={user} history={history}/>

        {!user.division ? <Regular size='16'>Вы не состоите ни в одном отделе, вступить можно на <ButtonText fontSize='18px' onClick={()=>history.replace('/edit')}>странице редактирования профиля</ButtonText> </Regular> :

            <DepartmentCard  department={department} user={user} history={history} users={users}/>
  
        }
            

        
        </div>
    )
}
export default Department