import styles from '../../Styles/modules/main/main.module.css'
import Profile from './profileComponent'
//профиль пользователя по ID
import './main.css'
import { useSelector, useDispatch } from "react-redux"
import { allNews } from '../../redux/actions/news';
import { allProjects } from '../../redux/actions/projects';
import { useEffect } from 'react'
import { loadUser } from '../../redux/actions/auth'
import { Redirect } from 'react-router-dom'
import ProjectsBlock from './projectsBlock'
import NewsBlock from './newsBlock'
import TaskBlock from './taskBlock'
import SprintBlock from './sprintBlock'

const Main = ({history}) => {

    const dispatch = useDispatch()
    
    const user = useSelector(state => state.auth.user)
    const reloadSprints = useSelector(state => state.auth.chosenSprint)
    


useEffect(() => {
    dispatch(loadUser());
    dispatch(allNews());
    dispatch(allProjects());
    
}, [])



useEffect(()=>{  
    dispatch(loadUser())
},[reloadSprints])

if(!user.name){
    return <Redirect to='edit' />
}
    return (
      <div className={styles.mainContainer}>
        <Profile
          className={styles.profile}
          user={user}
          history={history}
          change
          mainPage={true}
        />
        <ProjectsBlock history={history} user={user}/>
        <NewsBlock history={history} user={user}/>
        <TaskBlock user={user} history={history}/>
        <SprintBlock user={user}/>
      </div>
    );
}

export default Main