import styles from '../../Styles/modules/department/index.module.css'
import Profile from '../Main/profileComponent'
import {useSelector, useDispatch} from 'react-redux'
import { allDepartments, findDepartment } from '../../redux/actions/department'

import { useEffect, useState } from 'react'
import DepartmentCard from './departmentCard'
import { allUsers } from '../../redux/actions/user'
import { ButtonText } from '../../Styles/buttons'
import { Bold, Regular } from '../../Styles/typography'
import DepartmentSmallCard from './departmentSmallCard'
import { Title } from '../../Styles/common'

const OneDepartment = ({history, match}) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const users = useSelector(state => state.users.users)
    const department = useSelector(state => state.departments.findDep)
	const [load, setLoad] = useState (true)
 useEffect(()=>{
	console.log(user)
	dispatch(allUsers('name', true))
    dispatch(findDepartment(match.params.id))

 },[])
 useEffect(()=>{
	setTimeout(()=>{
		setLoad(true)
	},5000)
},[])
 const choseDivision =()=>{
	 
     history.replace(`./`)
 }
    return(
		
	<>
		{user!==null&&user!==undefined?
        <div className={styles.container}>
			<DepartmentCard load={load} department={department} user={user} history={history} users={users}/>
        </div>:''}
    
	</>
	)
}
export default OneDepartment