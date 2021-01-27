import styles from '../../Styles/modules/login/login.module.css'
import  {useState } from 'react'
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions/auth';
// import Login from './Login copy';
import {Input, LogForm} from '../../Styles/Forms'
import {Button, LoginButton} from '../../Styles/buttons'
import {Bold} from '../../Styles/typography'
const Login = () => {
    const dispatch = useDispatch();

    const [formData, setFormData ] = useState({
        
        email: '',
        password: ''

      
      });
      

      const { password, email} = formData;

  
    const onChange = e => {
        e.preventDefault(); 

        setFormData({ ...formData, [e.target.name]: e.target.value });
     }
     


     const onSubmit = async e => {
        e.preventDefault();
        dispatch(login(formData))
    
            // register({ name, email, password});
    
           
        }

    return (
     
            
            <form className={styles.loginForm} onSubmit={onSubmit}>
            <Bold size='24' className={styles.title}>Логин</Bold>
                <Input 
                    className={styles.email}
                    type='email'
                    placeholder='email'
                    name='email'
                    value={email}
                    onChange={e => onChange(e)}/>

                <Input
                    className={styles.password}
                    type='password'
                    placeholder='password'
                    name='password'
                    value={password}
                    onChange={e => onChange(e)}/>



            <Bold size='12' className={styles.forgot}>Забыли пароль?</Bold>
            <LoginButton color='white' bgColor='#3F496C' className={styles.button} type="submit"> Логин</LoginButton>

            </form>
     
    )
}


export default Login