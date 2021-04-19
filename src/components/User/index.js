
//@ALL USERS PAGE

import { useEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import { allUsers, background, userPosSearch, userTableSearch } from "../../redux/actions/user";
import style from '../../Styles/modules/components/Project/allproj.module.css'
//styled components
import { Select, NEW_TABLE, NEW_THEAD, NEW_TR, NEW_TH, NEW_TBODY, NEW_TD } from "../../Styles/tables";
import { Bold,  Regular, Thin} from '../../Styles/typography'
import { url } from "../utils/axios";
import { SearchInput } from "../../Styles/Forms";
import { allDepartments } from "../../redux/actions/department";
import Contractors from "../Superadmin/contractors";
import UsersTable from "./usersTable";



const Users = ({history}) => {


    const dispatch = useDispatch()
    const [usersSwitch, setUsers] = useState(false)
 
// useEffect(()=>{
//  console.log(users)
// },users)
    useEffect(()=>{ 
      dispatch(background('white'))
      return () => {
        dispatch(background('#ECECEC'))
      }
    }, [])

    return (
      <div className={style.main}>
        <div style={{display:'flex'}}>
          <Regular onClick={()=>{setUsers(false)}} size='16' style={{cursor:'pointer',textDecoration:`${!usersSwitch?'underline':'none'}`}} color={!usersSwitch?'#3F496C':'grey'} className={style.title}> Все сотрудники </Regular><Regular> / </Regular>
          <Regular onClick={()=>{setUsers(true)}} size='16' style={{cursor:'pointer',textDecoration:`${usersSwitch?'underline':'none'}`}} color={usersSwitch?'#3F496C':'grey'} >Все субподрядчики</Regular>
          </div>
        {!usersSwitch?<UsersTable history={history}></UsersTable>:<Contractors history={history}></Contractors>
        }
        
            
      </div>
    );
}



export default Users