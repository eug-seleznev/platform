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
import { Bold, Light, Thin } from '../../Styles/typography'
import { useEffect, useState } from 'react'
import { ButtonText } from '../../Styles/buttons'
import { loadUser } from '../../redux/actions/auth'
import { Redirect } from 'react-router-dom'
import ModalWindow from '../Projects/components/ModalWindow'

const Main = ({history}) => {

    const dispatch = useDispatch()
    const listNews = useSelector(state => state.news.news)
    const user = useSelector(state => state.auth.user)
    const reloadSprints = useSelector(state => state.auth.chosenSprint)
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
          <Light color="#3F496C" size="24" className={styles.myProj}>
            Мои проекты
          </Light>

          {user.projects.map((el, i) => 
              <ProjectsCard
                project={el}
                key={i}
                sprints={user.sprints}
                history={history}
              />
        
          )}
        </div>

        <div className={styles.news}>
          <div className={styles.create__news}>
            <Thin color="black" size="24">
              Новости бюро
            </Thin>
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
          <ButtonText
            color="#3F496C"
            size="12"
            className={styles.allNews}
            onClick={() => history.replace(`/news`)}
          >
            Все новости
          </ButtonText>
        </div>

        {newsOpen.open == true && (
          <NewsOpen
            close={() => setNewsOpen({ open: false, content: null })}
            content={newsOpen.content}
          />
        )}
      </div>
    );


    
}



export default Main