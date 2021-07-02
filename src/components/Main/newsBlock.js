

import styles from '../../Styles/modules/main/main.module.css'

import { Bold } from '../../Styles/typography'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import ProjTasks from '../MyTasks/projTasks'
import getCurrentMonth from '../MyTasks/getCurrentMonth'
import { finishAllTasks } from '../../redux/actions/user'
import BoardsBlock from './boardsBlock'

export const Path = process.env.REACT_APP_PATH;

const NewsBlock = ({user, history}) => {
  const dispatch = useDispatch()
  const [currentMonth, setCurrentMonth] =useState('')
	// const [status, setStatus] = useState (false)
	// const [newsOpen, setNewsOpen] = useState({
  //       open: false,
  //       content: null,
  //   })
	// const listNews = useSelector(state => state.news.news)
	// if(!listNews){
	// 	return <p>loading...</p> 
	// }
	// const closeWindow =()=>{
	// 	setStatus(false)
	//   }
    useEffect(()=>{
      setCurrentMonth(getCurrentMonth(Date.now()))
      console.log(user.tasks)
    },[])
    const pushToProject =(link)=>{
      history.push(`./projects/${link}/main`)
    }
    const onChange = (e) => {
      let taskid = e.target.value;
      dispatch(finishAllTasks({ taskid }));
      };
    return(
		<div className={styles.main__news}>
          <div className={styles.create__news}>
          <img alt='news' className={styles.create__news__img}  src={Path + "tasks.png"}></img>
            <Bold color="black" size="18">
              Избранные доски
            </Bold>
            {/* {user.permission==='admin'?<img alt='news' className={styles.create__news__button} onClick={()=>{setStatus(true)}} src={Path + "plus.png"}></img>:''} */}
          </div>
          {/* <ModalWindow 
            bigTitle={'Создание новости'} 
            histCurrent={history} 
            customElements={'CreateNews'} 
            status={status} 
            closeWindow={closeWindow}
        ></ModalWindow> */}
          {/* {listNews.map((el, i) => {
            const amount = window.innerWidth < 1000 ? 2 : 3;
            return (
              i < amount && (
                <div
                  key={i}
                  onClick={() => setNewsOpen({ open: true, content: el })}
                > */}
                  {/* <NewsCard  /> */}
                {/* </div>
              )
            );
          })} */}
          {/* <Bold
            color="#3F496C"
            size="12"
            className={styles.allNews}
            onClick={() => history.replace(`/news`)}
          >
            Все новости
          </Bold> */}
		  {/* {newsOpen.open == true && (
          <NewsOpen
            close={() => setNewsOpen({ open: false, content: null })}
            content={newsOpen.content}
          />
        )} */}
        <BoardsBlock mainPage={true} boards={user.boards} tasks={user.tasks}month={currentMonth} onChange={onChange} pushToProject={pushToProject}history={history}/>
        </div>
    )
}

export default NewsBlock 