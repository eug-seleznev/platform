import styles from '../../Styles/modules/login/logScreen.module.css'
import { useState } from "react"
import Login from './Login'
import Register from './Register'
import RegisterCustomer from './RegisterCustomer'
import { Card, Container} from '../../Styles/common'
import {LoginButton} from '../../Styles/buttons'
import {Bold, Regular, Light} from '../../Styles/typography'



const Auth = () => {
    const [page, setPage] = useState(0)
    return (
        <div className={styles.margins}>
        <div className={styles.container}>
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
