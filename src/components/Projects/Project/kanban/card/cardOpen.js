
import AddTask from './components/AddTask'
import styles from './card.module.css'
import CardEditor from './components/CardEditor';
import TaskTable from './components/TaskTable';
import Comments from './components/Comments';






const CardOpen = ({close}) => {


    
    return (
      <div className={styles.cardOpnenBackground} onClick={close}>
        <div className={styles.cardOpnenContainer} onClick={(e)=>e.stopPropagation()}>

            <CardEditor></CardEditor>
            <TaskTable></TaskTable>
            <AddTask></AddTask>
            <Comments></Comments>
        </div>
      </div>
    );    
}



export default CardOpen