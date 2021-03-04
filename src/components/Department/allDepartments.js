import styles from '../../Styles/modules/department/index.module.css'
import Profile from '../Main/profileComponent'
import {useSelector, useDispatch} from 'react-redux'
import { allDepartments } from '../../redux/actions/department'

import { useEffect, useState } from 'react'
import DepartmentCard from './departmentCard'
import { allUsers, background } from '../../redux/actions/user'
import { ButtonText } from '../../Styles/buttons'
import { Bold, Regular } from '../../Styles/typography'
import DepartmentSmallCard from './departmentSmallCard'
import { Title } from '../../Styles/common'

const AllDepartments = ({history}) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const users = useSelector(state => state.users.users)
    const [id, setId] = useState ('')
    const allDeps = useSelector(state => state.departments.departments)
 useEffect(()=>{
    dispatch(allDepartments())
    dispatch(allUsers('name', true))
    dispatch(background('#FAFAFA'))
 },[])
  useEffect(()=>{ 
    return () => {
    dispatch(background('#ECECEC'))
  }
  }, [])
 useEffect (()=>{
    if(allDeps){
        console.log (allDeps)
    }
 },[allDeps])
 const choseDivision =(click)=>{
     
     history.push(`/departments/${click}`)
 }
    return(
        
        <div className={styles.container}>
        <Bold size='24' color='#3F496C' style={{borderBottom:'1px solid black'}}>Все отделы</Bold>
        <div  className={styles.small__card__contain}>
            {allDeps!==null&&allDeps!==undefined?allDeps.map((el)=>{
                return (
                    <DepartmentSmallCard func={choseDivision} department={el} user={user} />
                )
            }):''}
        </div>
        
            

        
        </div>
    )
}
export default AllDepartments