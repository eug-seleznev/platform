import { useEffect, useState } from "react"
import {useDispatch, useSelector} from 'react-redux'
import {changeData, changeAvatar} from '../../redux/actions/auth'
import { url } from '../utils/axios';


import styles from '../../Styles/modules/components/user/edit.module.css'
//styled components
import {Button} from '../../Styles/buttons'
import { Card, SmallContainer } from "../../Styles/common";
import { Input, LogForm } from "../../Styles/Forms";
import styled from "styled-components";
import { allDepartments, joinDepartment } from "../../redux/actions/department";

const Edit = ({match, history}) => {
	
	const loaded = useSelector(state => state.auth.loaded)
	const user = useSelector(state => state.auth.user)
	const departments = useSelector(state => state.departments.departments)
	// const select = user.division.divname==el.divname && selected
	const dispatch = useDispatch();
	console.log(departments, 'alaljlhskhdahsldjljk')
    const [formData, setFormData ] = useState({
        
		name: user.name ? user.name : '',
		lastname: user.lastname ? user.lastname : '',  
		position: user.position ? user.position : '',
		division: user.division ? user.division : '',  
        email: user.email ? user.email : '', 

      
      });
     const [text, setText] = useState ('') 

      const {name,lastname, position, division, email } = formData;

      const  [file, setFile] = useState(null) 


      const handleFile = e => {
        setFile(e.target.files[0])
	}



	useEffect (()=> {
	dispatch(allDepartments())
	},[])



    const onChange = e => {
        e.preventDefault(); 
		console.log (e.target.value)
        setFormData({ ...formData, [e.target.name]: e.target.value });
	 }
	 const divisionChange = e => {
		e.preventDefault(); 
		console.log (e.target.value)
		
		setFormData({ ...formData, [division]: e.target.value });
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
		console.log(formData)
		// dispatch(changeData({formData})) так не обязательно
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

		<p>Имя</p>
		  <Input 
			  	type='text'
			 	placeholder={user.name}
				name="name"
				value={name}
			  	onChange={e => onChange(e)}
			></Input>


<p>Фамилия</p>
		  <Input 
			  	type='text'
			 	placeholder={user.lastname}
				name="lastname"
				value={lastname}
			  	onChange={e => onChange(e)}
			></Input>
<p>Отдел</p>
			<select
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
		

			<p>Сменить должность</p>
 		<Input 
			  type='text'
			  placeholder={user.position}
			  name="position"
			  value={position}
			  onChange={e => onChange(e)}
			></Input>
			<p>Сменить e-mail</p>
 		<Input 
			  type='text'
			  placeholder={user.email}
			  value={email}
			  name="email"
			  onChange={e => onChange(e)}
			></Input>
			
			
			  
				
			
			<Button  onClick={changeMsg}  type="submit" value="Submit" >Сохранить</Button>
			<span />
			<Button  onClick={Redirect}  >Ничего не менять</Button>
		  </LogForm>
		  <p>Сменить аватар</p>
			 <Input 
                type='file'
                placeholder='загрузите изображение'
				onChange={handleFile}></Input>
				</div>
             
   )}
			</Card>
	</div>

    )
}



export default Edit