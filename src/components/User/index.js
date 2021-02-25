
//@ALL USERS PAGE

import { useEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import { allUsers } from "../../redux/actions/user";
import style from '../../Styles/modules/components/Project/allproj.module.css'
//styled components
import { Container, Card } from "../../Styles/common";
import { Table, Tr, Td } from "../../Styles/tables";
import { H1, H3} from '../../Styles/typography'



const Users = ({history}) => {


    const dispatch = useDispatch();
    const users = useSelector(state => state.users.users)
    const [sortOrder, setOrder] = useState(false)


    useEffect(() => {
        let query = 'name'
        dispatch(allUsers({query, sortOrder}))
    }, [])


    const sortFunction = (query) => {
        setOrder(!sortOrder)
        dispatch(allUsers({query, sortOrder}))
    }
    return (
      <div>
        <Card>
          <H1> Все сотрудники</H1>
          {!users ? (
            <p>loading...</p>
          ) : (
            <Table>
              <Tr className={style.tr__user} top="top">
                <Td onClick={() => sortFunction("name")}>Имя &#8597;</Td>
                <Td
                  onClick={() => sortFunction("email")}
                  className={style.turn__off}
                >
                  email &#8597;
                </Td>
                <Td onClick={() => sortFunction("position")}>
                  Должность &#8597;
                </Td>
                <Td className={style.turn__off}>Активные проекты</Td>
              </Tr>

              {users.map((user, i) => {
                return (
                  <Tr
                    className={style.tr__user}
                    key={i}
                    onClick={() => history.replace(`/users/${user._id}`)}
                  >
                    <Td>
                      {user.name} {user.lastname}
                    </Td>
                    <Td className={style.turn__off}>{user.email}</Td>
                    <Td>{user.position}</Td>
                    <Td className={style.turn__off}>{user.projects.length}</Td>
                  </Tr>
                );
              })}
            </Table>
          )}
        </Card>
      </div>
    );
}



export default Users