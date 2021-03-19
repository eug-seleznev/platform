
import ModalWindow from '../Projects/components/ModalWindow'
import styles from '../../Styles/modules/main/main.module.css'
import NewsCard from '../News/newsCard'
import { Bold } from '../../Styles/typography'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import NewsOpen from '../News/openNews'
const NewsBlock = ({user, history}) => {
	const [status, setStatus] = useState (false)
	const [newsOpen, setNewsOpen] = useState({
        open: false,
        content: null,
    })
	const listNews = useSelector(state => state.news.news)
	if(!listNews){
		return <p>loading...</p> 
	}
	const closeWindow =()=>{
		setStatus(false)
	  }
    return(
		<div className={styles.news}>
          <div className={styles.create__news}>
          <img alt='news' className={styles.create__news__img}  src='/news.png'></img>
            <Bold color="black" size="18">
              Новости бюро
            </Bold>
            {user.permission==='admin'?<img alt='news' className={styles.create__news__button} onClick={()=>{setStatus(true)}} src='/plus.png'></img>:''}
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
		  {newsOpen.open == true && (
          <NewsOpen
            close={() => setNewsOpen({ open: false, content: null })}
            content={newsOpen.content}
          />
        )}
        </div>
    )
}

export default NewsBlock 