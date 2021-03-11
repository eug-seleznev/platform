import { useEffect, useState } from "react"
import {useDispatch, useSelector} from 'react-redux'
import {changeData, changeAvatar} from '../../redux/actions/auth'
import { url } from '../utils/axios';


import styles from '../../Styles/modules/components/user/edit.module.css'
//styled components
import {Button, CancelButton} from '../../Styles/buttons'
import { Card, SmallContainer } from "../../Styles/common";
import { Input, LogForm } from "../../Styles/Forms";
import styled from "styled-components";
import { allDepartments, joinDepartment } from "../../redux/actions/department";
import { Thin } from "../../Styles/typography";
import Partition from "./partition";

const Edit = ({match, history}) => {
	
	const loaded = useSelector(state => state.auth.loaded)
	const user = useSelector(state => state.auth.user)
	const departments = useSelector(state => state.departments.departments)
	// const select = user.division.divname==el.divname && selected
	const dispatch = useDispatch();
    const [formData, setFormData ] = useState({
        
		name: user.name ? user.name : '',
		lastname: user.lastname ? user.lastname : '',  
		position: user.position ? user.position : '',
        email: user.email ? user.email : '', 
		report: user.report ? user.report : '', 
		bday: user.bday ? user.bday : '', 
		phone: user.phone ? user.phone : '', 
		partition: user.partition ? user.partition : [], 
      });
     const [text, setText] = useState ('') 

      const {name,lastname, position, email, report, bday, phone,partition } = formData;

      const  [file, setFile] = useState(null) 


      const handleFile = e => {
        setFile(e.target.files[0])
	}



	useEffect (()=> {
	dispatch(allDepartments())
	},[])



    const onChange = e => {
        e.preventDefault(); 
        setFormData({ ...formData, [e.target.name]: e.target.value });
	 }
	 const divisionChange = e => {
		e.preventDefault(); 
		
		dispatch(joinDepartment(e.target.value))
     }
     
	 const changeMsg = () => {

		
		// setText ('Данные были изменены')
		// setTimeout(() => {
		// 	setText ('')
		// }, 4000);
	 }
	 const Redirect = () => {
     
		return history.replace(`/users/me`)
	
}
     const onSubmit = e => {
		e.preventDefault();


		dispatch(changeData(formData))


		if (file !== null && file !== undefined) {
		
			dispatch (changeAvatar(file))
		
	}
    setTimeout(() => {
		history.replace(`/users/me`)
	}, 200);
           
        }
   
  
    return (
		<div>
			<Card style={{paddingBottom:'75px'}}>
        {!loaded? <div>loaded...</div> :
		  
		  (  
			  <div /*style={{display:'flex', flexDirection:'column', alignItems:'center'}}*/>
		  <LogForm className={styles.editForm}  onSubmit={onSubmit}>

		<Thin className={styles.p}>Имя</Thin>
		  <Input 
		  required 
			  	type='text'
			 	placeholder={user.name}
				name="name"
				value={name}
			  	onChange={e => onChange(e)}
			></Input>


<Thin className={styles.p}>Фамилия</Thin>
		  <Input 
		  required 
			  	type='text'
			 	placeholder={user.lastname}
				name="lastname"
				value={lastname}
			  	onChange={e => onChange(e)}
			></Input>
<Thin className={styles.p}>Отдел</Thin>
			<select
			required 
			onChange={e => divisionChange(e)}
			name='division'
			>
				<option selected={user.division? false : true}>Выберите отдел</option>
				{departments && departments.map((el,i)=>{

					return(
						<option selected={user.division&& (user.division.divname==el.divname ? true : false)} value={el.divname}>{el.divname}</option>
					)
				})}
				
			</select>
		

			<p className={styles.p}>Сменить должность</p>
		 <Input 
		 required 
			  type='text'
			  placeholder={user.position}
			  name="position"
			  value={position}
			  onChange={e => onChange(e)}
			></Input>
			<Thin className={styles.p}>Сменить e-mail</Thin>
		 <Input 
		 required 
			  type='text'
			  placeholder={user.email}
			  value={email}
			  name="email"
			  onChange={e => onChange(e)}
			></Input>
			<Thin className={styles.p}>Ссылка на отчетность</Thin>
				<Input 
				required 
					type='text'
					placeholder={user.report}
					value={report}
					name="report"
					onChange={e => onChange(e)}
					></Input>
			<Thin className={styles.p}>Телефон</Thin>
				<Input 
				 
					type='text'
					placeholder={user.phone}
					value={phone}
					name="phone"
					onChange={e => onChange(e)}
					></Input>
			<Thin className={styles.p}>День рождения</Thin>
				<Input 
					
					type='date'
					placeholder={user.report}
					value={bday}
					name="bday"
					onChange={e => onChange(e)}
					></Input>
			<Thin className={styles.p}>Сменить аватар</Thin>
			 <Input 
                type='file'
                placeholder='загрузите изображение'
				onChange={handleFile}></Input>
			<Thin className={styles.p}>Добавить раздел</Thin>
			 <Partition partition={partition} subcontr={true}></Partition>	
			<CancelButton fontSize='16px' grey onClick={Redirect}  >Ничего не менять</CancelButton>
				<Button fontSize='16px' onClick={changeMsg}  type="submit" value="Submit" >Сохранить</Button>
				
		
		  </LogForm>
		  
				</div>
             
   )}
			</Card>
	</div>

    )
}



export default Edit