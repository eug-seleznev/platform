
import AddTask from './components/AddTask'
import styles from './card.module.css'
import CardEditor from './components/CardEditor';
import TaskTable from './components/TaskTable';
import Comments from './components/Comments';
import { useEffect } from 'react';






const CardOpen = ({close, info}) => { 
    const dispatch= useDispatch()

    useEffect(()=>{
      if(isOpen) {
        dispatch(currentCard(info._id))
      }
    },[isOpen])
    
    return (
      <div className={styles.cardOpnenBackground} onClick={close}>
        <div className={styles.cardOpnenContainer} onClick={(e)=>e.stopPropagation()}>
            <CardEditor info={info}></CardEditor>
            <TaskTable></TaskTable>
            <AddTask></AddTask>
            <Comments></Comments>
        </div>
      </div>
    );    
}



export default CardOpen