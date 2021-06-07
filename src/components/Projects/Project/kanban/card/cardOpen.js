
import AddTask from './components/AddTask'
import styles from './card.module.css'
import CardEditor from './components/CardEditor';
import TaskTable from './components/TaskTable';
import Comments from './components/Comments';
import { useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';






const CardOpen = ({close,setDeleteWindow,chosenCard,boardId}) => { 

    
    const info = useSelector(state=>state.projects.card)
    const project = useSelector(state=>state.projects.project)
   
    // useEffect(()=>{
    //   console.log(boardId)
    // },[])
    const escFunction = useCallback((e) => {
      if(e.keyCode === 27) {
        close()
      }
    }, []);
  
    useEffect(() => {
      document.addEventListener("keydown", escFunction, false);
  
      return () => {
        document.removeEventListener("keydown", escFunction, false);
      };
    }, []);
    return (
      <>
      {info&&
        <div className={styles.cardOpnenBackground}  onMouseDown={close}>
        <div className={styles.cardOpnenContainer} onClick={(e)=>e.stopPropagation()} onMouseUp={(e)=>e.stopPropagation()} onMouseDown={(e)=>e.stopPropagation()}>
            
              <div style={{display:"flex"}}>
                <div className={styles.cardStatusColor} 
                  style={{backgroundColor:info.emergency==="Обычная"?'#8FA7C6':
                    info.emergency==="Срочная"?'#FFB21D':
                    info.emergency==="Критическая"?'#D83B44':
                    info.emergency==="Событие"?'#9CE3B0':'#8FA7C6',
                  width:'16px'}}>
                </div>
              <div>
              <CardEditor boardId={boardId} chosenCard={chosenCard} setDeleteWindow={setDeleteWindow} info={info}></CardEditor>
              <TaskTable info={info} id={info._id} team={project.team2} tasksArray={info.tasks}></TaskTable>
              <AddTask  id={info._id}></AddTask>
              <Comments emergency={info.emergency} id={info._id} ></Comments>
            </div>
              
            </div>
            
        </div>
      </div>
      }
      </>
    );    
}



export default CardOpen