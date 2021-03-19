import styles from '../../Styles/modules/login/register.module.css'

import  {useState } from 'react'
import { useDispatch } from 'react-redux';
import { register } from '../../redux/actions/auth';
import {Input} from '../../Styles/Forms'
import {LoginButton} from '../../Styles/buttons'
import {Bold} from '../../Styles/typography'

const Auth = () => {
const dispatch = useDispatch();

    const [formData, setFormData ] = useState({
        
        rocketname: '',
        email: ''
      
      });
      

      const { rocketname, email } = formData;

  
    const onChange = e => {
        e.preventDefault(); 
        setFormData({ ...formData, [e.target.name]: e.target.value });
     }
     

     const onSubmit = async e => {
        e.preventDefault();
         dispatch(register({formData}))
           
        }

    return (
        
            <form onSubmit={onSubmit} className={styles.registerForm}>
            <Bold size='24' className={styles.title}>Регистрация</Bold>

            <Input 
                className={styles.email}
                type='email'
                placeholder='email'
                name='email'
                value={email}
                onChange={e => onChange(e)}/>

           <Input 
                className={styles.rocket}
                type='text'
                placeholder='rocketname'
                name='rocketname'
                value={rocketname}
                onChange={e => onChange(e)}/>

            <LoginButton color='white' bgColor='#3F496C' className={styles.button} type="submit"> Зарегистрироваться</LoginButton>

            </form>
       
    )
}


export default Auth