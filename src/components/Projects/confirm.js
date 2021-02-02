import styles from '../../Styles/modules/components/News/confirm.module.css'
import {Card} from '../../Styles/common'
import {Button} from '../../Styles/buttons'
import { useState } from 'react'

const Confirm = ({ title,openConfirm, handleDelete, buttonTitle,handleEnd}) => {
    // const [overCard, setOvercard] = useState(false)

    return(
    <div className={styles.bg} >
            <Card className={styles.card} >
                
                    <div>Вы уверенны что хотите {buttonTitle.toLowerCase()} проект "{title}"</div>
                    <Button  onClick={buttonTitle=='Удалить'?handleDelete:buttonTitle=='Завершить'?handleEnd:''} >{buttonTitle} проект</Button>
                    <Button onClick={openConfirm} >Отмена</Button>
                
            </Card>
    </div>
    )
}
export default Confirm