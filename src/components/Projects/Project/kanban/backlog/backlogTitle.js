import { Path } from '../../../../Layout/header'
import { Regular } from '../../../../../Styles/typography'
import styles from './backlog.module.css'

const BacklogTitle = ({cardNumber,closeBacklog}) => {

    return(
        <div className={styles.backlogTitleContainer} >
            <Regular size='18' color='white'>Задачи</Regular>
            <Regular size='12' color='black' className={styles.cardNumberCircle}>{cardNumber}</Regular>
            <img src={Path+'backlogArrow.png'} onClick={closeBacklog} className={styles.backlogCloseArrow} />
        </div>
    )
}
export default BacklogTitle