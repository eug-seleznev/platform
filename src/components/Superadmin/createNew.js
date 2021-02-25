
//профиль пользователя по ID
import './news.css'
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

import { allNews, createNews} from '../../redux/actions/news';
import { Button, CancelButton } from '../../Styles/buttons';
import {  Thin} from '../../Styles/typography'
import style from '../../Styles/modules/components/Project/createPr.module.css'

///////////////
const CreateNews = ({ closeWindow}) => {
    const dispatch = useDispatch();
    

    const [formData, setFormData ] = useState({ 
        title: '',   //title
        subtitle: '', 
        text: '',  
      });
  
      const { title, subtitle, text,} = formData;


    const onChange = e => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
    }


    const onSubmit = async e => {
            e.preventDefault();
            dispatch(createNews(formData))

            setTimeout(() => {
				dispatch(allNews())
				closeWindow()
			}, 100);  
			
            setFormData({
                title:'',subtitle:'',text:''
            })
    }
   

useEffect(()=>{
 dispatch(allNews())
},[])

    return (

	<div className={style.container}>
		<form className={style.form} onSubmit={onSubmit}>
			<div>
				<Thin className={style.small__title}>Заголовок</Thin>
				<input 
				
					type='text'
					// required
					name='title'
					value={title}
					onChange={e => onChange(e)}/>
				<Thin className={style.small__title}>Подзаголовок</Thin>
                <input 
                // required
					type='text'
					name='subtitle'
					value={subtitle}
					onChange={e => onChange(e)}/>
				<Thin className={style.small__title}>Текст</Thin>
                <textarea 
                // required
					name='text'
					value={text}
					onChange={e => onChange(e)}/>
			</div>
			<div className={style.row}>
				<CancelButton className={style.button}  grey padd={'60px'}onClick={closeWindow}>Отмена</CancelButton>
				<Button style={{height:'40px'}} className={style.button} padd={'30px'} fontSize={'16px'} type="submit">Создать новость</Button>
			</div>
            
        </form>
	</div>

)
}



export default CreateNews