import styles from '../../Styles/modules/components/News/confirm.module.css'
import {Card} from '../../Styles/common'
import {Button} from '../../Styles/buttons'
import { useState } from 'react'

const Confirm = ({accept, decline, title, action}) => {
    const [overCard, setOvercard] = useState(false)

    return(
    <div className={styles.bg} onClick={!overCard && decline}>
            <Card className={styles.card} onMouseEnter={()=>setOvercard(true)} onMouseLeave={()=>setOvercard(false)}>
                
                    <div>Вы уверенны что хотите {action.toLowerCase()} предложение "{title}"</div>
                    <Button  type="submit" onClick={accept}>{action}</Button>
                    <Button  type="submit" grey onClick={decline}>Отмена</Button>
                
            </Card>
    </div>
    )
}
export default Confirm