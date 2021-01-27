import styles from '../../Styles/modules/components/proposesForm.module.css'
import { useState} from 'react'
import { useDispatch} from 'react-redux'
import { newPropose, likedProposes, dateProposes} from '../../redux/actions/office'



const ProposeForm = () => {

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
    }, 100);  
    setFormData({
        title:'',subtitle:'',text:''
    })
}


    return (
     
          
       
        <form className={styles.formContainer} onSubmit={onSubmit}>
           
            <input 
                className={styles.title}
                type='text'
                placeholder='Заголовок'
                name='title'
                value={title}
                onChange={e => onChange(e)}/>

   
    

            <textarea 
                className={styles.texts}
                
                placeholder='Текст'
                name='text'
                value={text}
                onChange={e => onChange(e)}/>
            



            <button className={styles.createBtn}  type="submit">Создать новость</button>

        </form>

    )
}



export default ProposeForm