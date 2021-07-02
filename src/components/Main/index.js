import styles from '../../Styles/modules/main/main.module.css'
import Profile from './profileComponent'
//профиль пользователя по ID
import './main.css'
import { useSelector, useDispatch } from "react-redux"
import { allNews } from '../../redux/actions/news';
import { allProjects } from '../../redux/actions/projects';
import { useEffect } from 'react'
import { getUserTasks, loadUser } from '../../redux/actions/auth'
import { Redirect } from 'react-router-dom'
import ProjectsBlock from './projectsBlock'
import NewsBlock from './newsBlock'
import TaskBlock from './taskBlock'
import SprintBlock from './sprintBlock'
import EventsBlock from './eventsBlock';

const Main = ({history}) => {

    const dispatch = useDispatch()
    const tasksStatus = useSelector(state => state.users.tasksStatus)
    const user = useSelector(state => state.auth.user)
    const reloadSprints = useSelector(state => state.auth.chosenSprint)
    


useEffect(() => {
  if(!tasksStatus) {
    dispatch(getUserTasks());
  }
    
    dispatch(allNews());
    dispatch(allProjects());
    
}, [])



useEffect(()=>{   
  
        if(!tasksStatus) {
    dispatch(getUserTasks());
  }
 
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
        <EventsBlock user={user} history={history}/>
        <SprintBlock user={user}/>
      </div>
    );
}

export default Main