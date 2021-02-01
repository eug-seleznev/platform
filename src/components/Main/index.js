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
// import { allUsers } from "../../redux/actions/user";
import { Container} from '../../Styles/common'
import { Bold, Thin } from '../../Styles/typography'
import { useEffect, useState } from 'react'
import { ButtonText } from '../../Styles/buttons'
import { loadUser } from '../../redux/actions/auth'

///////////////
const Main = ({history}) => {

    const dispatch = useDispatch()
    const loadedNews = useSelector(state => state.news.loaded)
    const listNews = useSelector(state => state.news.news)
    const loadedUser = useSelector(state => state.auth.loaded)
    const user = useSelector(state => state.auth.user)
    const reloadSprints = useSelector(state => state.auth.chosenSprint)
    const [newsOpen, setNewsOpen] = useState({
        open: false,
        content: null,
    })

useEffect(()=>{
        dispatch(loadUser());
setTimeout(() => {
   
}, 0)
 

},[])
useEffect(() => {
    if(user){
dispatch(allNews());
dispatch(allProjects());
    }
}, [user])
useEffect(()=>{
    
    dispatch(loadUser())

},[reloadSprints])


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
                            const amount = window.innerWidth<1000? 2 : 3
                                return(
                                i<amount && <div onClick={()=>setNewsOpen({open:true, content: el})}><NewsCard el={el} /></div>
                                )
                            })
                    }
                    
                    <ButtonText color='#3F496C' size='12' className={styles.allNews} onClick={() => history.replace(`/news`)}>Все новости</ButtonText>       
                </div>

                {newsOpen.open==true && <NewsOpen close={()=>setNewsOpen({open:false, content: null})} content={newsOpen.content} />}
                
                        
            </div>)



        }
        </>
    )
}



export default Main