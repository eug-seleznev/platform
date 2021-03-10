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
	const [button, setButton] = useState (false)
 useEffect(()=>{
	console.log(user)
	dispatch(allUsers('name', true))
    dispatch(findDepartment(match.params.id))

 },[])
//  useEffect(()=>{
// 	 console.log(user.division)
// 	 if(user.division===null) {
// 		console.log('hi')
// 	 }
// 	else if(user.division!==undefined||user.division!==null||department!==undefined||department!==null) {
// 		if(user.division.divname===department.divname){
// 			setButton(true)
// 		}
		
// 	}

// },[])
 const choseDivision =()=>{
	 
     history.replace(`./`)
 }
    return(
		
	<>
		{user!==null&&user!==undefined?
		
        (<div className={styles.container}>
			<DepartmentCard button={button}  department={department} user={user} history={history} users={users}/>
        </div>):''}
    
	</>
	)
}
export default OneDepartment