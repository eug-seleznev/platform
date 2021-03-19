


//профиль пользователя по ID
import styles from '../../Styles/modules/components/News/pageNews.module.css'
import NewsCard from './newsCard'
import CreateNews from './createNews'
import NewsOpen from './openNews'
import UpdateNews from './updateNews'
import Confirm from './confirm'

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { allNews,deleteNews} from '../../redux/actions/news';
// import { allUsers } from "../../redux/actions/user";
import {  Card, } from '../../Styles/common';
import {  ButtonText } from '../../Styles/buttons';
import {Bold} from '../../Styles/typography'

const News = () => {
    const dispatch = useDispatch();
    // const auth = useSelector(state => state.auth.isAuthenticated)
    const loaded = useSelector(state => state.news.loaded)
    const listNews = useSelector(state => state.news.news)
    const user = useSelector(state => state.auth.user)

    const [updateOpen, setUpdateOpen] = useState({
        status: false,
        post: '',
    })
    const [newsOpen, setNewsOpen] = useState({
        open: false,
        content: null,
    })
    const [createForm, setCreateForm] = useState(false)
    const [deleteConfirm, setConfirm] = useState({
        status: false,
        post:'',
    })

    // const [formData, setFormData ] = useState({
        
    //     title: '',   //title
    //     subtitle: '', 
    //     text: '',  
      
    //   });
  


    
    const onDelete = async (e,id) => {
        e.preventDefault();
        setConfirm({status:true,post:id})
    }
    const onUpdate = async (e,id) => {

        e.preventDefault();
        setUpdateOpen({status:true, post:id})

    }
    const deleteNewsButton = async e => {
        e.preventDefault();

        dispatch(deleteNews(deleteConfirm.post._id))
        setTimeout(() => {
            setConfirm({status:false, post:''})
            dispatch(allNews())
        }, 100);
    }

    

  


useEffect(()=>{
 dispatch(allNews())
},[])

    return (

<div className={styles.mainContainer}>
				
            <Bold size='36' className={styles.title}>Все новости:</Bold>

                
            {!loaded? <p>loading...</p> : 
            
                <div className={styles.allNewsList}>
                    
                    {listNews.map((el,i)=>{
                        
                        return(
                            <div className={styles.newsContainer} >
                                <div className={styles.newsCard} onClick={()=>setNewsOpen({open:true, content: el})}>
                                    <NewsCard el={el} />
                                </div>
                                <div className={styles.buttons}>
                                    {user.permission!='user' && <ButtonText onClick={(e)=>onUpdate(e, el)}>Редактировать</ButtonText>}
                                    {user.permission!='user' && <ButtonText onClick={(e)=>onDelete(e, el)}>Удалить</ButtonText>}
                                </div>
                            </div>
                        )
                    })}
                </div>
            }


            <div className={styles.formArea}>
                <div className={styles.formSticky}>
                {user.permission!='user' && (!createForm?
                    <Card className={styles.openForm} onClick={()=>setCreateForm(true)}>
                        <Bold size='12' color='#3F496C'>Создать новость</Bold>
                    </Card>
                    :
                    <CreateNews closeForm={()=>setCreateForm(false)} />)}  
                </div>
            </div>
                


{/* modals */}

{newsOpen.open==true && <NewsOpen close={()=>setNewsOpen({open:false, content: null})} content={newsOpen.content} />}

{updateOpen.status && <UpdateNews content={updateOpen.post} close={()=>setUpdateOpen({status:false, post:''})}/>}
         
{deleteConfirm.post && <Confirm accept={(e)=>deleteNewsButton(e)} decline={()=>setConfirm({status:false, post:''})} title={deleteConfirm.post.title} />
      
            }
			</div>

)
}



export default News