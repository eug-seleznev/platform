import styles from '../../Styles/modules/components/News/confirm.module.css'
import {Card} from '../../Styles/common'
import {Button} from '../../Styles/buttons'
import { useState } from 'react'

const ConfirmSubDel = ({accept, decline, title, contractor}) => {
    
    return(
    console.log(contractor),
    <div className={styles.bg} >
            <Card className={styles.card}>
                
                    <div>Вы уверенны что хотите удалить {contractor.fullname}</div>
                    <Button  type="submit" onClick={()=>accept(contractor._id)}>Покинуть отдел</Button>
                    <Button grey type="submit" onClick={()=>decline(false)}>Отмена</Button>
                
            </Card>
    </div>
    )
}
export default ConfirmSubDel