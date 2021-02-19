import './news.css'
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

import { allNews, createNews} from '../../redux/actions/news';
import { Button, CancelButton } from '../../Styles/buttons';
import {  Thin} from '../../Styles/typography'
import style from '../../Styles/modules/components/Project/createPr.module.css'
import { addContractor } from '../../redux/actions/user';

///////////////
const AddContractor = ({ closeWindow}) => {
    const dispatch = useDispatch();
    

    const [formData, setFormData ] = useState({ 
        name: '',   //title
        lastname: '', 
		job:'',
        phone: '', 
		email:'' ,
      });
  
      const { name, lastname,job, phone,email} = formData;


    const onChange = e => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
    }


    const onSubmit = async e => {
            e.preventDefault();
            dispatch(addContractor(formData))

            setTimeout(() => {
				
				closeWindow()
			}, 100);  
			
            setFormData({
                name:'',lastname:'',phone:'',email:'',job:''
            })
    }
   



    return (

	<div className={style.container}>
		<form className={style.form} onSubmit={onSubmit}>
			<div>
				<div style={{display:'flex',justifyContent:'space-between'}}>
					<div style={{width:'40%'}}>
						<Thin className={style.small__title}>Имя</Thin>
						<input 
						
							type='text'
							required
							name='name'
							value={name}
							onChange={e => onChange(e)}/>
					</div>
					<div style={{width:'40%'}}>
						<Thin className={style.small__title}>Фамилия</Thin>
						<input 
						required
							type='text'
							name='lastname'
							value={lastname}
							onChange={e => onChange(e)}/>
					</div>
				</div>
				<div style={{width:'40%'}}>
					<Thin className={style.small__title}>Вид деятельности</Thin>
                	<input 
                	required
					name='job'
					value={job}
					onChange={e => onChange(e)}/>
				</div>
				
				<div style={{display:'flex',justifyContent:'space-between'}}>
					<div style={{width:'40%'}}>
						<Thin className={style.small__title}>Телефон</Thin>
						<input 
						// required
							name='phone'
							value={phone}
							onChange={e => onChange(e)}/>
					</div>
					<div style={{width:'40%'}}>
						<Thin className={style.small__title}>Почта</Thin>
						<input 
						// required
							name='email'
							value={email}
							onChange={e => onChange(e)}/>
					</div>
				</div>
			</div>
			<div className={style.row}>
				<CancelButton className={style.button}  grey padd={'60px'}onClick={closeWindow}>Отмена</CancelButton>
				<Button style={{height:'40px'}} className={style.button} padd={'30px'} fontSize={'16px'} type="submit">Добавить смежника</Button>
			</div>
            
        </form>
	</div>

)
}



export default AddContractor