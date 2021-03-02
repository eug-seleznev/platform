import styles from '../../Styles/modules/components/proposesForm.module.css'
import { useState} from 'react'
import { useDispatch} from 'react-redux'
import { newPropose, likedProposes, dateProposes} from '../../redux/actions/office'
import {Regular} from '../../Styles/typography'
import { Button, CancelButton } from '../../Styles/buttons'
import { Card } from '../../Styles/common'



const ProposeForm = ({closeForm}) => {

const dispatch = useDispatch()

    const [formData, setFormData ] = useState({
        
        title: '',   
        text: '',  
      
      });
      const { title, text,} = formData;


const onChange = e => {

    e.preventDefault(); 

    setFormData({ ...formData, [e.target.name]: e.target.value });
}


const onSubmit = (e) => {
    e.preventDefault();
    dispatch(newPropose(formData))

    setTimeout(() => {
        dispatch(dateProposes())
        dispatch(likedProposes())
        closeForm()
    }, 100);  
    setFormData({
        title:'',subtitle:'',text:''
    })
}


    return (
     
          
     <Card className={styles.formCard}>
        <form className={styles.formContainer} onSubmit={onSubmit}>
        
            <Regular size='30'>Предложение</Regular>
           
            <input 
                className={styles.title}
                type='text'
                placeholder='Заголовок'
                name='title'
                value={title}
                required
                onChange={e => onChange(e)}/>
               
   
    

            <textarea 
                className={styles.texts}
                required
                placeholder='Текст'
                name='text'
                value={text}
                onChange={e => onChange(e)}/>
            

            <div style={{display:'flex'}}>
                <CancelButton fontSize='16px' padd='50px' grey onClick={closeForm}>Отмена</CancelButton>
                <Button fontSize='16px' padding='50px' className={styles.createBtn}  type="submit">Создать</Button>
            </div>
            
        </form>
   </Card>
    )
}



export default ProposeForm