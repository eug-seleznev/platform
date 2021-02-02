import { url } from '../utils/axios';
import styles from '../../Styles/modules/components/profile.module.css'

import { Bold, Light } from '../../Styles/typography'
import { ButtonText } from '../../Styles/buttons'

const ProfileComponent = ({user, history, change}) => {

    return(
        <div className={styles.profile}>
            <img className={styles.avatar} src={`${url}/${user != null? (user!= undefined? user.avatar:''):''}`}/>
            <Bold size='30' mobSize='24' className={styles.name}> {user.name} {user.lastname}</Bold>
                {!change? <div className={styles.change}></div> :
                <ButtonText color='#3F496C 80 %;' fontSize='12' className={styles.change} onClick={() => history.replace(`/edit`)}>изменить</ButtonText>
                }  
            <Light color='#4B4B4B' size='16' className={styles.pos}>Должность: {user.position}</Light>
            <Bold size='24' className={styles.contacts}>Контакты:</Bold>
            <Light color='#4B4B4B' size='16' className={styles.mail}>{user.email}</Light>
            <Light color='#4B4B4B' size='16' className={styles.rocket}>rocket: {user.rocketchat && user.rocketchat}</Light>
        </div>
    )
}
export default ProfileComponent