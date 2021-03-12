import styles from '../../../../Styles/modules/components/News/confirm.module.css'
import {Card} from '../../../../Styles/common'
import {Button} from '../../../../Styles/buttons'


const Confirm = ({ title,openConfirm, handleDelete, buttonTitle,handleEnd,type}) => {
    // const [overCard, setOvercard] = useState(false)

    return(
    <div className={styles.bg} >
            <Card className={styles.card} >
                
                    <div>Вы уверенны что хотите {buttonTitle.toLowerCase()} {type} "{title}"</div>
                    <Button  onClick={buttonTitle=='Удалить'?handleDelete:buttonTitle=='Завершить'||buttonTitle=='Восстановить'?handleEnd:''} >{buttonTitle} проект</Button>
                    <Button onClick={openConfirm} grey >Отмена</Button>
                
            </Card>
    </div>
    )
}
export default Confirm