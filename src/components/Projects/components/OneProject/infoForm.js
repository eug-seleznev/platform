import styles from '../../../../Styles/modules/department/form.module.css'
import { useState} from 'react'

import {Regular} from '../../../../Styles/typography'
import { Button, CancelButton } from '../../../../Styles/buttons'
import { Card } from '../../../../Styles/common'



const InfoForm = ({setModal, teamInfo}) => {
	const [formData, setFormData ] = useState({
        
        position: '',   
        task: '',  
      
      });
    const {position, task} = formData;

  
	const onChange = e => {

		e.preventDefault(); 

		setFormData({ ...formData, [e.target.name]: e.target.value });
	}


const onSubmit = (e) => {
    e.preventDefault();
    teamInfo(formData)
    setFormData({
        position:'',task:''
    })
}

    return (
     
        <div className={styles.bg} >
       <Card >
        <form className={styles.formContainer} onSubmit={onSubmit}>
            <Regular size='30'>Введите данные</Regular>
           
            <input 
                required
                className={styles.title2}
                type='text'
                placeholder='Должность на проекте'
                name='position'
				value={position}
                onChange={e => onChange(e)}
				/>
            <input  
                required
                className={styles.title2}  
                placeholder='Раздел на проекте'
                name='task'
				value={task}
                onChange={e => onChange(e)}
				/>
            

			<div style={{display:'flex'}}>
				<CancelButton grey padd='15px'onClick={()=>{setModal(false)}}>Отмена</CancelButton>
            	<Button fontSize='16px' padding='50px' className={styles.createBtn}  type="submit">Присоединиться</Button>
			</div>
			

        </form>
        </Card>
        </div>
    )
}



export default InfoForm