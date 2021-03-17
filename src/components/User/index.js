
//@ALL USERS PAGE

import { useEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import { allUsers, background } from "../../redux/actions/user";
import style from '../../Styles/modules/components/Project/allproj.module.css'
//styled components
import { Container, Card } from "../../Styles/common";
import { Table, Tr, Td, New_table, New_thead, New_Tr, New_Th, New_Td, New_tbody, Select } from "../../Styles/tables";
import { Bold, H1, H3, Regular, Thin} from '../../Styles/typography'
import { Link } from "react-router-dom";
import { url } from "../utils/axios";
import { SearchInput } from "../../Styles/Forms";



const Users = ({history}) => {


    const dispatch = useDispatch();
    const users = useSelector(state => state.users.users)
    const [sortOrder, setOrder] = useState(false)


    useEffect(() => {
        let query = 'name'
        dispatch(allUsers({query, sortOrder}))
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
    return (
      <div className={style.main}>
        <Regular size='16' color='#3F496C' className={style.title}> Все сотрудники</Regular>
        <div className={style.row}>
         <div className={style.row__in}>
               <img src='/lupa.png' className={style.row__img}></img>
               <SearchInput size='14px' placeholder='Поиск сотрудника' name='title' ></SearchInput>
             </div>
             <div className={style.row__in}>
               <img src='/lupa.png' className={style.row__img}></img>
               <SearchInput size='14' placeholder='По должности'></SearchInput>
             </div>
             <Thin size='14'>
                Всего сотрудников: {users.length}
             </Thin>
             <div className={style.row__in}>
               <Bold size='14'>Фильтр:</Bold>
               <Select style={{fontSize:'14px'}}
                // onChange={statusFilter}
                >
                <option>Все</option>
                <option>В работе</option>
                <option>Завершенные</option>
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
                  <New_Th className={style.turn__off}>Активные проекты</New_Th>
                </New_Tr>
              </New_thead>
              <New_tbody>
              {users.map((user, i) => {
                return (
                  <New_Tr
                    className={style.tr__user}
                    key={i}
                    onClick={() => history.replace(`/users/${user._id}`)}
                  >
                    <New_Td className={style.row__name} >
                      <img className={style.img} src={url+'/'+user.avatar}></img>
                      <Regular>{user.name} {user.lastname}</Regular>
                    </New_Td>
                    <New_Td className={style.turn__off}>{user.email}</New_Td>
                    <New_Td>{user.position}</New_Td>
                    <New_Td className={style.turn__off}>{user.projects.length}</New_Td>
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