import { useEffect, useState } from "react"
import {useDispatch, useSelector} from 'react-redux'
import { getUser } from "../../redux/actions/user";
import { ButtonText } from "../../Styles/buttons";
import styles from '../../Styles/modules/main/main.module.css'
import { Bold } from '../../Styles/typography'
import  ProfileComponent  from '../Main/profileComponent'
import ProjectsCard from '../Main/projectsCard'

import './user.css'


const Employe = ({match, history}) => {
    let {id} = match.params;
    const user = useSelector(state => state.users.user)
    const loaded = useSelector(state => state.users.userLoaded)
    const dispatch = useDispatch();
    const myUser = useSelector(state => state.auth.user)
    const [permission, setPermission] = useState('')
    useEffect(()=>{
        
        dispatch(getUser(id))
        // console.log(history, 'aaaaaaaaaaaaaaaaaaaaaaaaaa')
    },[])
    useEffect(()=>{
        if (myUser!==undefined){
           setPermission(myUser.permission)
        } 
     },[myUser])
    return (
      <div
        style={{
          display: history.location.pathname === "/users/me" ? "none" : "block",
        }}
      >
        {!loaded ? (
          <div>loading...</div>
        ) : (
          <div className={styles.mainContainer}>
            <ProfileComponent user={user} history={history} />
            {myUser.permission === "admin" && (
              <ButtonText onClick={() => history.push(`/users/${id}/edit`)}> Изменить</ButtonText>
            )}
            <div className={styles.projects}>
              <Bold color="black" size="36" className={styles.myProj}>
                Проекты сотрудника
              </Bold>

              {user.projects.map((el, i) => {
                return (
                  <ProjectsCard
                  key={i}
                    project={el}
                    permission={permission}
                    sprints={user.sprints}
                    history={history}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
}



export default Employe