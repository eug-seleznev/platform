
import AddTask from './components/AddTask'
import styles from './card.module.css'
import CardEditor from './components/CardEditor';
import TaskTable from './components/TaskTable';
import Comments from './components/Comments';
import { useEffect } from 'react';
import { currentCard } from '../../../../../redux/actions/kanban';
import { useDispatch, useSelector } from 'react-redux';






const CardOpen = ({close}) => { 

    
    const info = useSelector(state=>state.projects.card)
    const project = useSelector(state=>state.projects.project)

    useEffect(()=>{
      console.log(info)
    },[])

    return (
      <>
      {info&&
        <div className={styles.cardOpnenBackground} onClick={close}>
        <div className={styles.cardOpnenContainer} onClick={(e)=>e.stopPropagation()}>
            <CardEditor info={info}></CardEditor>
            <TaskTable id={info._id} team={project.team2} tasksArray={info.tasks}></TaskTable>
            <AddTask id={info._id}></AddTask>
            <Comments id={info._id} ></Comments>
        </div>
      </div>
      }
      </>
    );    
}



export default CardOpen