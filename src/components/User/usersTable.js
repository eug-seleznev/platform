
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



const UsersTable = ({history}) => {


    const dispatch = useDispatch();
    const divisions = useSelector(state => state.departments.departments)
    const users = useSelector(state => state.users.users)
    const [sortOrder, setOrder] = useState(false)

    useEffect(() => {
     
        let query = 'name'
        dispatch(allUsers({query, sortOrder}))
        dispatch(allDepartments())
    }, [])

    useEffect(()=>{ 
      dispatch(background('white'))
      return () => {
        dispatch(background('#ECECEC'))
      }
    }, [])
    const sortFunction = (query) => {
        setOrder(!sortOrder)
        dispatch(allUsers({query, sortOrder}))
    }
    const findUser =(e)=> {
      let field = e.target.name
      let value = e.target.value
      dispatch(userTableSearch({value, field}))
    }
    const findUserPos =(e)=> {
      let value = e.target.value
      dispatch(userPosSearch(value))
    }
    
    return (
      <div className={style.main}>
        <div className={style.row}>
         <div className={style.row__in}>
               <img src='/lupa.png' alt='lupa' className={style.row__img}></img>
               <SearchInput size='14px' onChange={findUser} placeholder='Поиск сотрудника' name='name' ></SearchInput>
             </div>
             <div className={style.row__in}>
               <img src='/lupa.png' alt='lupa' className={style.row__img}></img>
               <SearchInput size='14' name='position' onChange={findUserPos}  placeholder='По должности'></SearchInput>
             </div>
             <div className={style.row__in}>
                <Thin size='14'>
                    Всего сотрудников: {users.length}
                </Thin>
             </div>
             <div className={style.row__in}>
               <Bold size='14'>По отделу: </Bold>
               <Select style={{fontSize:'14px'}}
                onChange={findUser}
                name='division'
                >
                <option value=''>Все</option>
                {divisions && divisions.map((div,i)=>{
                  return(
                    <option key={i}>{div.divname}</option>
                  )
                })} 
               </Select>
             </div>
          </div>
          
          {!users ? (
            <p>loading...</p>
          ) : (
            <NEW_TABLE className={style.table}>
              <NEW_THEAD>
                <NEW_TR  className={style.first} top="top">
                  <NEW_TH onClick={() => sortFunction("name")}>Имя &#8597;</NEW_TH>
                  <NEW_TH
                    onClick={() => sortFunction("email")}
                    className={style.turn__off}
                  >
                    email &#8597;
                  </NEW_TH>
                  <NEW_TH onClick={() => sortFunction("position")}>
                    Должность &#8597;
                  </NEW_TH>
                  <NEW_TH>Отдел</NEW_TH>
                  <NEW_TH className={style.turn__off}>Проекты</NEW_TH>
                  {/* <New_Th className={style.turn__off}>Спринты</New_Th> */}
                </NEW_TR>
              </NEW_THEAD>
              <NEW_TBODY>
              {users.map((user, i) => {
                return (
                  <NEW_TR
                    className={style.tr__user}
                    key={i}
                    onClick={() => history.push(`/users/${user._id}`)}
                  >
                    <NEW_TD className={style.row__name} >
                      <img alt='ava' className={style.img} src={url+'/'+user.avatar}></img>
                      <Regular>{user.name} {user.lastname}</Regular>
                    </NEW_TD>
                    <NEW_TD className={style.turn__off}>{user.email}</NEW_TD>
                    <NEW_TD>{user.position}</NEW_TD>
                    <NEW_TD>{user.division && user.division.divname}</NEW_TD>
                    <NEW_TD className={style.turn__off}>{user.projects.length}</NEW_TD>
                    {/* <New_Td className={style.turn__off}>{user.sprints.length}</New_Td> */}
                  </NEW_TR>
                );
              })}
              </NEW_TBODY>
            </NEW_TABLE>
          )}
            
      </div>
    );
}



export default UsersTable