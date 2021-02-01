import styles from '../../Styles/modules/department/index.module.css'
import Profile from '../Main/profileComponent'
import {useSelector, useDispatch} from 'react-redux'
import { newDepartment, allDepartments} from '../../redux/actions/department'

import { useEffect, useState } from 'react'
import { Card } from '../../Styles/common'
import DepartmentForm from './depForm'
import DepartmentCard from './departmentCard'
import { allUsers } from '../../redux/actions/user'

const Department = ({history}) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const users = useSelector(state => state.users.users)
    const departments = useSelector(state => state.departments.departments)
    const loaded = useSelector(state => state.departments.loaded)

    const [openForm, setOpenForm] = useState(false)

 useEffect(()=>{
    dispatch(allDepartments())
    dispatch(allUsers())
 },[])
console.log(users,'ssssssssssssssssssssssssssss')

    return(
        <div className={styles.container}>
            <Profile   user={user} history={history}/>

    
        {!user.division? <div>loading ...</div> :

            <DepartmentCard user={user} history={history} users={users}/>

        //  departments.map((el, i)=>{

        //     return(
        //         <DepartmentCard content={el} user={user} history={history} users={users}/>
        //         )
        //  })
        }
            

        
        </div>
    )
}
export default Department