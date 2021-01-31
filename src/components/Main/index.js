import styles from '../../Styles/modules/main/main.module.css'
import Profile from './profileComponent'
import NewsCard from '../News/newsCard'
import ProjectsCard from './projectsCard'
import NewsOpen from '../News/openNews'


//профиль пользователя по ID
import './main.css'
import { useSelector, useDispatch } from "react-redux"
import { allNews } from '../../redux/actions/news';

// import { allUsers } from "../../redux/actions/user";
import { Container} from '../../Styles/common'
import { Bold, Thin } from '../../Styles/typography'
import { useEffect, useState } from 'react'

///////////////
const Main = ({history}) => {

    const dispatch = useDispatch()
    const loadedNews = useSelector(state => state.news.loaded)
    const listNews = useSelector(state => state.news.news)
    const loadedUser = useSelector(state => state.auth.loaded)
    const user = useSelector(state => state.auth.user)
    const [newsOpen, setNewsOpen] = useState({
        open: false,
        content: null,
    })

useEffect(()=>{
    dispatch(allNews())
},[])

    return (
        <>
        {!loadedUser ? <p> loading..</p> : (

            <div className={styles.mainContainer}>

                <Profile className={styles.profile} user={user} history={history} change/>
            

                <div className={styles.projects}>
                    <Bold color='black' size='36' className={styles.myProj}>Мои проекты</Bold>

                    {user.projects.map((el,i)=>{
                        
                        return(
                            <ProjectsCard project={el}  sprints={user.sprints} history={history} />
                        )
                    })}
                    
                </div>


                <div className={styles.news}>
                    <Thin color='black' size='24'>Новости бюро:</Thin>

                    {!loadedNews? <p>loading...</p> : 
                        
                        listNews.map((el,i)=>{
                            
                                return(
                                i<3 && <div onClick={()=>setNewsOpen({open:true, content: el})}><NewsCard el={el} /></div>
                                )
                            })
                    }
                    
                    <Bold color='#3F496C' size='12' className={styles.allNews}>Все новости</Bold>       
                </div>

                {newsOpen.open==true && <NewsOpen close={()=>setNewsOpen({open:false, content: null})} content={newsOpen.content} />}
                
                        
            </div>)



        }
        </>
    )
}



export default Main