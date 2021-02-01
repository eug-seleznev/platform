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
 useEffect(()=>{
    console.log(departments, 'dddddddddddddddddddddddddd')
 },[departments])

    return(
        <div className={styles.container}>
            <Profile   user={user} history={history}/>

        { user.permission=='admin' && (
        !openForm? <Card className={styles.createDep} onClick={()=>setOpenForm(true)}>Создать отдел</Card> : <DepartmentForm closeForm={()=>setOpenForm(false)}/>
        )}
            
        {!loaded? <div>loading ...</div> :
         departments.map((el, i)=>{

            return(
                <DepartmentCard content={el} user={user} history={history} users={users}/>
                )
         })
        }
            

        
        </div>
    )
}
export default Department