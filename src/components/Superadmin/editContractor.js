
//профиль пользователя по ID
import './news.css'
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

import {getContractor} from '../../redux/actions/user';
import { Button, CancelButton } from '../../Styles/buttons';
import {  Bold, Thin} from '../../Styles/typography'
import style from '../../Styles/modules/components/Project/createPr.module.css'

///////////////
const EditContractor = ({match}) => {
	let {id} = match.params;
    const dispatch = useDispatch();
	useEffect(()=>{
		dispatch(getContractor(id))
	}, [])

    const [formData, setFormData ] = useState({ 
		name:'',
        lastname: '',   //title
        phone: '', 
        email: '',  
      });
  
      const { phone, email, name, lastname} = formData;


    const onChange = e => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
    }


    const onSubmit = async e => {
            e.preventDefault();
            // dispatch(createNews(formData))

        
			
           
    }

    return (

	<div className={style.container}>
		
		<form className={style.form} onSubmit={onSubmit}>
		<Bold size='24'>Редактировать информацию субподрядчика</Bold>
			<div className={style.editContractor}>

				<Thin className={style.small__title}>Имя</Thin>
				<input 
				
					type='text'
					// required
					name='name'
					value={name}
					onChange={e => onChange(e)}/>
				<Thin className={style.small__title}>Фамилия</Thin>
				<input 
				
					type='text'
					// required
					name='lastname'
					value={lastname}
					onChange={e => onChange(e)}/>
				<Thin className={style.small__title}>Почта</Thin>
                <input 
                // required
					type='text'
					name='email'
					value={email}
					onChange={e => onChange(e)}/>
				<Thin className={style.small__title}>Телефон</Thin>
                <input 
                // required
					type='text'
					name='phone'
					value={phone}
					onChange={e => onChange(e)}/>
				<Thin className={style.small__title}>Разделы</Thin>
                
			</div>
			<div className={style.row}>
				
				<Button style={{height:'40px'}} className={style.button} padd={'30px'} fontSize={'16px'} type="submit">Сохранить</Button>
			</div>
            
        </form>
	</div>

)
}



export default EditContractor