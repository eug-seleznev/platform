import { url } from '../utils/axios';
import styles from '../../Styles/modules/components/News/updateNews.module.css'

import { Bold, Light,Thin, Regular } from '../../Styles/typography'
import { ButtonText, Button } from '../../Styles/buttons'
import { Card } from '../../Styles/common'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { allNews, createNews, deleteNews, updateNews} from '../../redux/actions/news';


const UpdateNews = ({close, content}) => {

    const dispatch = useDispatch()

const [overCard, setOvercard] = useState(false)


const [formData, setFormData ] = useState({
        
    title: content.title,   //title
    subtitle: content.subtitle, 
    text: content.text,  
  
  });

  const { title, subtitle, text,} = formData;


const onChange = e => {

        e.preventDefault(); 

        setFormData({ ...formData, [e.target.name]: e.target.value });
}

const updateNewsButton = async e => {
    e.preventDefault();

    let id = content._id
    let data = formData
    dispatch(updateNews({id, data}))


    setTimeout(() => {
        close()
        dispatch(allNews())
    }, 100);
}
    
    return(
        <div className={styles.bg} onClick={!overCard && close}>
            <Card className={styles.card} onMouseEnter={()=>setOvercard(true)} onMouseLeave={()=>setOvercard(false)}>
            <form className={styles.form}>
           
                <input 
                    className={styles.title}
                    type='text'
                    placeholder='Заголовок'
                    name='title'
                    value={title}
                    onChange={e => onChange(e)}/>

        
                <input 
                    className={styles.subtitle}
                    type='text'
                    placeholder='Подзаголовок'
                    name='subtitle'
                    value={subtitle}
                    onChange={e => onChange(e)}/>

                <textarea 
                    className={styles.text}
                    
                    placeholder='Текст'
                    name='text'
                    value={text}
                    onChange={e => onChange(e)}/>
                


                
                    <Button padd='40px' className={styles.edit}  type="submit" onClick={(e) =>updateNewsButton(e)}>Редактировать новость</Button>
                    <Button padd='40px' className={styles.cancel} type="submit" onClick={()=>{setFormData({title:'',subtitle:'',text:''}); close()}}>Отмена</Button>
                
                

            </form>         
            </Card>
        </div>
      
    )
}
export default UpdateNews