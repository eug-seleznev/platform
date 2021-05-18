
import AddTask from '../../Tasks/Sprint/AddTask'
import styles from './card.module.css'
import CardEditor from './components/CardEditor';






const CardOpen = ({close}) => {


    
    return (
      <div className={styles.cardOpnenBackground} onClick={close}>
        <div className={styles.cardOpnenContainer} onClick={(e)=>e.stopPropagation()}>

            <CardEditor></CardEditor>
        </div>
      </div>
    );    
}



export default CardOpen