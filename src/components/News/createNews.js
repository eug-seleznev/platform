import styles from '../../Styles/modules/components/News/createNews.module.css'
import { Card } from '../../Styles/common'
import { useState } from "react"
import { useDispatch } from "react-redux"
import { allNews, createNews } from '../../redux/actions/news';
import {Button} from '../../Styles/buttons'

const CreateNews = ({closeForm}) => {

    const dispatch = useDispatch();



    const [formData, setFormData ] = useState({
        
        title: '',   //title
        subtitle: '', 
        text: '',  
      
      });
  
      const { title, subtitle, text,} = formData;


    const onChange = e => {

        e.preventDefault(); 

        setFormData({ ...formData, [e.target.name]: e.target.value });
}


    const onSubmit = async e => {
        
        e.preventDefault();

        dispatch(createNews(formData))
        setTimeout(() => {
            
            dispatch(allNews())
        }, 100);  
        setFormData({
            title:'',subtitle:'',text:''
        })

        closeForm()

}

    return(

        <Card>
            
            <form className={styles.form} onSubmit={onSubmit}>
           
                    <input 
                        className={styles.title}
                        type='text'
                        placeholder='Заголовок'
                        name='title'
                        value={title}
                        onChange={e => onChange(e)}/>

        
                    <input 
                        className={styles.subTitle}
                        type='text'
                        placeholder='Подзаголовок'
                        name='subtitle'
                        value={subtitle}
                        onChange={e => onChange(e)}/>

                    <textarea 
                        style={{resize:'none'}}
                        
                        placeholder='Текст'
                        name='text'
                        value={text}
                        onChange={e => onChange(e)}/>
                    

                    <Button className={styles.button}  type="submit">Создать новость</Button>

            </form>
        </Card>
    )
}
export default CreateNews