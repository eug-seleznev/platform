import styles from '../../Styles/modules/department/form.module.css'
import { useState} from 'react'
import { useDispatch} from 'react-redux'
import { newDepartment, allDepartments} from '../../redux/actions/department'
import {Regular} from '../../Styles/typography'
import { Button } from '../../Styles/buttons'
import { Card } from '../../Styles/common'



const DepartmentForm = ({closeForm}) => {

const dispatch = useDispatch()

    const [formData, setFormData ] = useState({
        
        divname: '',   
        description: '',  
      
      });
      const { divname, description,} = formData;

  
const onChange = e => {

    e.preventDefault(); 

    setFormData({ ...formData, [e.target.name]: e.target.value });
}


const onSubmit = (e) => {
    e.preventDefault();
    dispatch(newDepartment(formData))

    setTimeout(() => {
        dispatch(allDepartments())
    
        closeForm()
    }, 100);  
    setFormData({
        divname:'',description:''
    })
}


    return (
     
          
       <Card>
        <form className={styles.formContainer} onSubmit={onSubmit}>
            <Regular size='30'>Новый отдел</Regular>
           
            <input 
                className={styles.title}
                type='text'
                placeholder='Заголовок'
                name='divname'
                value={divname}
                onChange={e => onChange(e)}/>

   
    

            <textarea 
                className={styles.texts}
                
                placeholder='Описание'
                name='description'
                value={description}
                onChange={e => onChange(e)}/>
            



            <Button fontSize='16px' padding='50px' className={styles.createBtn}  type="submit">Создать</Button>

        </form>
        </Card>
    )
}



export default DepartmentForm