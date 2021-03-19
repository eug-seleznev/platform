
//@ALL USERS PAGE

import { useEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import { allUsers, background, userPosSearch, userTableSearch } from "../../redux/actions/user";
import style from '../../Styles/modules/components/Project/allproj.module.css'
//styled components
import { Container, Card } from "../../Styles/common";
import { Table, Tr, Td, New_table, New_thead, New_Tr, New_Th, New_Td, New_tbody, Select } from "../../Styles/tables";
import { Bold, H1, H3, Regular, Thin} from '../../Styles/typography'
import { Link } from "react-router-dom";
import { url } from "../utils/axios";
import { SearchInput } from "../../Styles/Forms";
import { allDepartments } from "../../redux/actions/department";



const Users = ({history}) => {


    const dispatch = useDispatch();
    const divisions = useSelector(state => state.departments.departments)
    const users = useSelector(state => state.users.users)
    const [sortOrder, setOrder] = useState(false)
    

    useEffect(() => {
     
        let query = 'name'
        dispatch(allUsers({query, sortOrder}))
        dispatch(allDepartments())
    }, [])
// useEffect(()=>{
//  console.log(users)
// },users)
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
        <Regular size='16' color='#3F496C' className={style.title}> Все сотрудники</Regular>
        <div className={style.row}>
         <div className={style.row__in}>
               <img src='/lupa.png' className={style.row__img}></img>
               <SearchInput size='14px' onChange={findUser} placeholder='Поиск сотрудника' name='name' ></SearchInput>
             </div>
             <div className={style.row__in}>
               <img src='/lupa.png' className={style.row__img}></img>
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
            <New_table className={style.table}>
              <New_thead>
                <New_Tr  className={style.first} top="top">
                  <New_Th onClick={() => sortFunction("name")}>Имя &#8597;</New_Th>
                  <New_Th
                    onClick={() => sortFunction("email")}
                    className={style.turn__off}
                  >
                    email &#8597;
                  </New_Th>
                  <New_Th onClick={() => sortFunction("position")}>
                    Должность &#8597;
                  </New_Th>
                  <New_Th>Отдел</New_Th>
                  <New_Th className={style.turn__off}>Проекты</New_Th>
                  {/* <New_Th className={style.turn__off}>Спринты</New_Th> */}
                </New_Tr>
              </New_thead>
              <New_tbody>
              {users.map((user, i) => {
                return (
                  <New_Tr
                    className={style.tr__user}
                    key={i}
                    onClick={() => history.push(`/users/${user._id}`)}
                  >
                    <New_Td className={style.row__name} >
                      <img className={style.img} src={url+'/'+user.avatar}></img>
                      <Regular>{user.name} {user.lastname}</Regular>
                    </New_Td>
                    <New_Td className={style.turn__off}>{user.email}</New_Td>
                    <New_Td>{user.position}</New_Td>
                    <New_Td>{user.division && user.division.divname}</New_Td>
                    <New_Td className={style.turn__off}>{user.projects.length}</New_Td>
                    {/* <New_Td className={style.turn__off}>{user.sprints.length}</New_Td> */}
                  </New_Tr>
                );
              })}
              </New_tbody>
            </New_table>
          )}
        
      </div>
    );
}



export default Users