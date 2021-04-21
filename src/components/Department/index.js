import styles from '../../Styles/modules/department/index.module.css'
import Profile from '../Main/profileComponent'
import {useSelector, useDispatch} from 'react-redux'
import { allDepartments, findDepartment} from '../../redux/actions/department'

import { useEffect, useState } from 'react'
import DepartmentCard from './departmentCard'
import { allUsers } from '../../redux/actions/user'
import { ButtonText } from '../../Styles/buttons'
import table from '../../Styles/modules/components/Project/allproj.module.css'

import {  Regular } from '../../Styles/typography'
import AllDepartments from './allDepartments'

const Department = ({history}) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const users = useSelector(state => state.users.users)
    const department = useSelector(state => state.departments.findDep)
    const [load, setLoad] = useState (true)
    const [myDeps, setMyDeps] = useState (true)
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
        if(user.division!==null&&user.division!==undefined) {
            dispatch(findDepartment(user.division.divname))
        }
    }
},[user])
    return(
        <div className={styles.container}>
            {/* <Profile user={user} history={history}/> */}
            <div style={{display:'flex'}}>
                <Regular size='16'onClick={()=>{setMyDeps(true)}} color={myDeps?"#3F496C":'grey'} className={table.title} style={{cursor:'pointer', marginTop:'-25px',textDecoration:`${myDeps?"underline":'none'}`}}>Мой отдел</Regular>
                <Regular size='16' style={{marginTop:'-25px'}}> / </Regular>
                <Regular size='16'onClick={()=>{setMyDeps(false)}} color={!myDeps?"#3F496C":'grey'} className={table.title} style={{cursor:'pointer', marginTop:'-25px',textDecoration:`${!myDeps?"underline":'none'}`,marginLeft:'0px'}}>Все отделы</Regular>
            </div>
          {user.division===null||
          user.division===undefined||
          department===null? 
          <Regular size='16'>Вы не состоите ни в одном отделе, вступить можно на <ButtonText fontSize='18px' onClick={()=>history.push('/edit')}>странице редактирования профиля</ButtonText> </Regular> :
          myDeps?

            <DepartmentCard  button={true}load={load} itsAllDepsPage={false} department={department} user={user} history={history} users={users}/>
            :<AllDepartments history={history}/>
  
        }
        
    
                  
            

        
        </div>
    )
}
export default Department