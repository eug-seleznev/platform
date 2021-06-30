
import AddTask from './components/AddTask'
import styles from './card.module.css'
import CardEditor from './components/CardEditor';
import TaskTable from './components/TaskTable';
import Comments from './components/Comments';
import { useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';






const CardOpen = ({close,setDeleteWindow,chosenCard,boardId, history, theme,timelineId}) => { 

    
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
        <div className={styles.cardOpnenBackground}  
        
        >
          <div style={{height:'100vh'}} onMouseDown={close}></div>
            <div className={styles.cardOpnenContainer} style={{ backgroundColor:!theme?'white':'#1E1E1E'}} >
              <div style={{display:"flex"}}>
                <div className={styles.cardStatusColor} 
                  style={{
                    backgroundColor:info.emergency==="Обычная"?'#8FA7C6':
                    info.emergency==="Срочная"?'#FFB21D':
                    info.emergency==="Критическая"?'#D83B44':
                    info.emergency==="Событие"?'#9CE3B0':'#8FA7C6',
                    width:'16px'
                  }}>
                </div>
              <div>
              <CardEditor timelineId={timelineId} theme={theme} boardId={boardId} chosenCard={chosenCard}tasksLength={info.tasks?.length} history={history} setDeleteWindow={setDeleteWindow} info={info}></CardEditor>
              <TaskTable  theme={theme} info={info} id={info._id} team={project.team2} tasksArray={info.tasks}></TaskTable>
              <AddTask theme={theme} proj_id={project._id} id={info._id}></AddTask>
              <Comments theme={theme} history={history} emergency={info.emergency} id={info._id} ></Comments>
            </div>
              
            </div>
            
        </div>
      </div>
      }
      </>
    );    
}



export default CardOpen