import styles from '../../Styles/modules/login/logScreen.module.css'
import { useState,useEffect } from "react"
import Login from './Login'
import Register from './Register'
import RegisterCustomer from './RegisterCustomer'
import { Card, Container} from '../../Styles/common'
import {LoginButton} from '../../Styles/buttons'
import {Bold, Regular, Light} from '../../Styles/typography'
import {useDispatch, useSelector} from 'react-redux'
import { BackendMsg }  from '../../Styles/layout'
import {errorAuthClear, msgAuthClear}  from "../../redux/actions/auth";
const Auth = () => {   
     const [error, setError] = useState(0)
    const [page, setPage] = useState(0)
    const errorAuth = useSelector(state => state.auth.error)
    const [msg, setMsg] = useState (false)
    const [msgTiming, setMsgTiming] = useState (false)
    const [color, setColor] = useState (false)
    const dispatch = useDispatch()
    useEffect(()=>{
        if(errorAuth !=""){
            setError(errorAuth)
        }
    },[errorAuth])
    useEffect(()=>{
        setColor('red')
        if(error!=''){
            setMsgTiming(true)
                setTimeout(()=>{
                    setMsgTiming(false)
                    setTimeout(() => {
                        setError('')
                        dispatch(errorAuthClear())
                    }, 100);
                     
                },4500)
        }
    },[error])
    useEffect(()=>{
        if(msg!=''){
            setColor('green')
            
            setMsgTiming(true)
                setTimeout(()=>{
                    setMsgTiming(false)
                    setTimeout(() => {
                        dispatch(msgAuthClear()) 
                        setMsg('')
                }, 100);
                },3500)
        }
    },[msg])
    return (
        <div className={styles.margins}>
        <div className={styles.container}>
        <BackendMsg color={color} style={{opacity:`${msgTiming?1:0}`,zIndex:`${msgTiming?10000:-1000}`, transition:'500ms ease all'}}>
            {color==='red'?error:color==='green'?msg:''}
        </BackendMsg>
            <div className={styles.buro}>
                <Bold size='30' color='white'>BURO82</Bold>
                <Light size='16' color='white' className={styles.mobSlogan}>Вся информация о проекте в единой информационной среде.</Light>
            </div>

            <div className={styles.buroContentBG} style={{backgroundImage: 'url(/loginBG.png)'}}> 
                <div className={styles.buroContent}>
                    <Regular size='30' color='white' className={styles.buroTitle}>Платформа для ведения <br/> архитектурно-строительных проектов</Regular>
                    <Light size='16' color='white' className={styles.buroText}>Вся информация о проекте в единой информационной среде.</Light>
                    <div className={styles.btnCont}>
                        <LoginButton color='#3F496C' bgColor='white'  className={styles.register} onClick={(() => page==0? setPage(1) : setPage(0))}>{page==0?'Регистрация':'Логин'}</LoginButton>
                        <LoginButton color='white' bgColor='transparent' className={styles.client} onClick={(() => setPage(2))}>Я клиент</LoginButton>
                    </div>
                    
                </div>                    
            </div>

            <div className={styles.platform}>
                <Bold size='30'>PLATFORM</Bold>
            </div>
                

            <div  className={styles.forms}>
                {page ==0 && <Login/>}
                {page ==1 && <Register />}
                {page ==2 && <RegisterCustomer />}
            </div>
            
        </div>
        </div>
    )
}




export default Auth
