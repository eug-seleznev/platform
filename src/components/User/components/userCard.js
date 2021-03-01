import { url } from '../../utils/axios';
import styles from '../../../Styles/modules/components/user/userCard.module.css'

import { Bold, Light } from '../../../Styles/typography'
import { Button, ButtonText } from '../../../Styles/buttons'
import { Card } from '../../../Styles/common';


const UserCard = ({user, history}) => {


    return(
        <Card className={styles.userCard}>
            <img className={styles.avatar} src={`${url}/${user ? user.avatar:''}`}/>
            <Bold size='24' mobSize='18' className={styles.name}> {user && user.name} {user && user.lastname}</Bold>  
            <Light color='#4B4B4B' size='20' className={styles.pos}>{user && user.position}</Light>
            <Button className={styles.profile} onClick={()=>history.replace(`/users/${user && user._id}`)}>Профиль</Button>
        </Card>
    )
}
export default UserCard