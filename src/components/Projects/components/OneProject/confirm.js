import styles from '../../../../Styles/modules/components/News/confirm.module.css'
import {Card} from '../../../../Styles/common'
import {Button} from '../../../../Styles/buttons'


const Confirm = ({ title,openConfirm, handleDelete, buttonTitle,handleEnd,type}) => {
    // const [overCard, setOvercard] = useState(false)]
    const action = ()=>{
       if(buttonTitle==='Удалить') {
             handleDelete()  
       }
               
       else {handleEnd()}
    }
    return(
    <div className={styles.bg} >
            <Card className={styles.card} >
                
                    <div>Вы уверенны что хотите {buttonTitle.toLowerCase()} {type} "{title}"</div>
                    <Button  onClick={action} >{buttonTitle} {type}</Button>
                    <Button onClick={openConfirm} grey >Отмена</Button>
                
            </Card>
    </div>
    )
}
export default Confirm