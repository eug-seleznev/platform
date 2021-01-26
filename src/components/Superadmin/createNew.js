
import {  Redirect } from 'react-router-dom';


//профиль пользователя по ID
import './news.css'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { allTickets } from "../../redux/actions/tikets";
import { allNews, createNews, deleteNews, updateNews} from '../../redux/actions/news';
// import { allUsers } from "../../redux/actions/user";
import { Container, Card, } from '../../Styles/common';
import { Button, CancelButton } from '../../Styles/buttons';
import { H1, H3, Regular, Thin} from '../../Styles/typography'
import style from '../../Styles/modules/components/Project/createPr.module.css'
//////////////////////////////////////// ШО ЭТО
import Me from '../User/me'
import { url } from '../utils/axios';
///////////////
const CreateNews = ({permissions, closeWindow}) => {
    const dispatch = useDispatch();
    // const auth = useSelector(state => state.auth.isAuthenticated)
    
    const user = useSelector(state => state.auth.user)

    const [newsOpen, setOpen] = useState({
        status: false,
        post: '',
    })
    const [deleteConfirm, setConfirm] = useState({
        status: false,
        post:'',
    })

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
//     const Redirect = () => {  
//         return history.push(`/projects`)
// }
    const onSubmit = async e => {
        
            e.preventDefault();

            dispatch(createNews(formData))
            setTimeout(() => {
                setConfirm({status:false, post:''})
				dispatch(allNews())
				closeWindow()
			}, 100);  
			
            setFormData({
                title:'',subtitle:'',text:''
            })
    }
   

useEffect(()=>{
 dispatch(allNews())
 console.log(user,'hiiiiiiiiiiii')
},[])

    return (

	<div >
		<form className={style.form} onSubmit={onSubmit}>
			<div>
				<Thin className={style.small__title}>Заголовок</Thin>
				<input 
				
					type='text'
					
					name='title'
					value={title}
					onChange={e => onChange(e)}/>
				<Thin className={style.small__title}>Подзаголовок</Thin>
				<input 
					type='text'
					name='subtitle'
					value={subtitle}
					onChange={e => onChange(e)}/>
				<Thin className={style.small__title}>Текст</Thin>
				<textarea 
					name='text'
					value={text}
					onChange={e => onChange(e)}/>
			</div>
			<div className={style.row}>
				<CancelButton  grey padd={'60px'}onClick={closeWindow}>Отмена</CancelButton>
				<Button style={{height:'40px'}} padd={'30px'} fontSize={'16px'} type="submit">Создать новость</Button>
			</div>
            
        </form>
	</div>

)
}



export default CreateNews