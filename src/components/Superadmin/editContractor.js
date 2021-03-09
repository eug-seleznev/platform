
//профиль пользователя по ID
import './news.css'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import {editContractor, getContractor} from '../../redux/actions/user';
import { Button, CancelButton } from '../../Styles/buttons';
import {  Bold, Thin} from '../../Styles/typography'
import style from '../../Styles/modules/components/Project/createPr.module.css'
import Partition from '../User/partition';

///////////////
const EditContractor = ({match,history}) => {
	let {id} = match.params;
	const contractor = useSelector(state=>state.users.contractor)
    const dispatch = useDispatch();
	useEffect(()=>{
		dispatch(getContractor(id))
	}, [])
	useEffect(()=>{

	},[ contractor ])
    const [formData, setFormData ] = useState({ 
		name:'',
        lastname:'',   //title
        phone:'', 
        email:'', 
		partition:'',
      });
	  useEffect(() => {
		if (contractor!==null ) {
			setFormData ({...formData, 
				name:contractor.name, 
				lastname:contractor.lastname,
				phone:contractor.phone,
				email:contractor.email,
				partition:contractor.partition
				})
		}
		
    }, [contractor])
      const { phone, email, name, lastname, partition} = formData;


    const onChange = e => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
    }


    const onSubmit = async e => {
            e.preventDefault();
            dispatch(editContractor(id,formData))
			setTimeout(()=>{
				history.replace('.')
			},100)
        
			
           
    }

    return (
	
	<div className={style.container}>
		{
			contractor!==null?
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
				<Thin className={style.small__title}>Раздел</Thin>
                <Partition partition={partition} subcontr={true}></Partition>
                
			</div>
			<div className={style.row}>
				
				<Button style={{height:'40px',marginTop:'30px'}} className={style.button} padd={'30px'} fontSize={'16px'} type="submit">Сохранить</Button>
			</div>
            
        </form>
			:<div>loading...</div>
		}
		
	</div>

)
}



export default EditContractor