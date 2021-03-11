import styles from '../../Styles/modules/main/main.module.css'
import Profile from './profileComponent'
import NewsCard from '../News/newsCard'
import ProjectsCard from './projectsCard'
import NewsOpen from '../News/openNews'


//профиль пользователя по ID
import './main.css'
import { useSelector, useDispatch } from "react-redux"
import { allNews } from '../../redux/actions/news';
import { allProjects } from '../../redux/actions/projects';
import { Bold, Light, Regular, Thin } from '../../Styles/typography'
import { useEffect, useState } from 'react'
import { ButtonText } from '../../Styles/buttons'
import { loadUser } from '../../redux/actions/auth'
import { Redirect } from 'react-router-dom'
import ModalWindow from '../Projects/components/ModalWindow'
import SprintCard from './sprintCard'

const Main = ({history}) => {

    const dispatch = useDispatch()
    const listNews = useSelector(state => state.news.news)
    const user = useSelector(state => state.auth.user)
    const reloadSprints = useSelector(state => state.auth.chosenSprint)
    const [showProj, setShowProj] = useState (1)
    const [newsOpen, setNewsOpen] = useState({
        open: false,
        content: null,
    })
    const [status, setStatus] = useState (false)

useEffect(() => {
    dispatch(loadUser());
    dispatch(allNews());
    dispatch(allProjects());
    
}, [])
const closeWindow =()=>{
  setStatus(false)
}

useEffect(()=>{  
    dispatch(loadUser())
},[reloadSprints])


useEffect(()=>{
  console.log(user)
},[user])

if(!user.name){
    return <Redirect to='edit' />
}

if(!listNews){
    return <p>loading...</p> 
}

    return (
      <div className={styles.mainContainer}>
        <Profile
          className={styles.profile}
          user={user}
          history={history}
          change
        />

        <div className={styles.projects}>
          <div style={{display:'flex'}}>
            <img src="/proj.png" style={{height:'34px'}}></img>
            <Regular color="#3F496C" size="18" className={styles.myProj}>
              Мои проекты
            </Regular>
            <Bold color={showProj===1?'#3F496C':'#959595'} size="18" onClick={()=>{setShowProj(1)}} className={styles.myProjButton}>
              активные
            </Bold>
            <Bold color={showProj===2?'#3F496C':'#959595'} size="18" onClick={()=>{setShowProj(2)}} className={styles.myProjButton}>
              все
            </Bold>
          </div>
          

          {showProj===1?user.projects.filter(proj=>!proj.status).map((el, i) => 
              <ProjectsCard
                project={el}
                key={i}
                sprints={user.sprints}
                history={history}
              />
        
          ):
          showProj===2?user.projects.map((el, i) => 
          <ProjectsCard
            project={el}
            key={i}
            sprints={user.sprints}
            history={history}
          />
    
      ):''}
        </div>

        <div className={styles.news}>
          <div className={styles.create__news}>
          <img className={styles.create__news__img}  src='/news.png'></img>
            <Bold color="black" size="18">
              Новости бюро
            </Bold>
            {user.permission==='admin'?<img className={styles.create__news__button} onClick={()=>{setStatus(true)}} src='/plus.png'></img>:''}
          </div>
          <ModalWindow 
            bigTitle={'Создание новости'} 
            histCurrent={history} 
            customElements={'CreateNews'} 
            status={status} 
            closeWindow={closeWindow}
        ></ModalWindow>
          {listNews.map((el, i) => {
            const amount = window.innerWidth < 1000 ? 2 : 3;
            return (
              i < amount && (
                <div
                  key={i}
                  onClick={() => setNewsOpen({ open: true, content: el })}
                >
                  <NewsCard el={el} />
                </div>
              )
            );
          })}
          <Bold
            color="#3F496C"
            size="12"
            className={styles.allNews}
            onClick={() => history.replace(`/news`)}
          >
            Все новости
          </Bold>
        </div>

        {newsOpen.open == true && (
          <NewsOpen
            close={() => setNewsOpen({ open: false, content: null })}
            content={newsOpen.content}
          />
        )}
        <div className={styles.my_sprints}>
        <div className={styles.create__news}>
          <img className={styles.create__news__img}  src='/starr.png'></img>
            <Bold color="black" size="18">
              Избранные спринты
            </Bold>
            
          </div>
        {user.sprints.map((sprint, i) => {

            return (<SprintCard key={i} sprint={sprint} project />)
          
          })}
        </div>
      </div>
    );


    
}



export default Main