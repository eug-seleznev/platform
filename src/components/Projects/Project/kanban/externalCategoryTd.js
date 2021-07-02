import { useDispatch, useSelector } from "react-redux"
import styles from './kanban.module.css'
import KanbanCard from "./card/card";
import { Regular } from "../../../../Styles/typography";



const ExternalCategoryTd = ({category, timelineCards, column, boardId, timelineId,history}) => {
    const theme = useSelector(state => state.auth.user.theme)
    let currentColunmCards = timelineCards &&  timelineCards.filter(el=>el.column===column)

    return (
        <div>
            <Regular className={styles.ext__td}>{column}</Regular>
            <div 
                style={{backgroundColor: theme?'#0D1117':'white'}}
                className={styles.ext__td} 
                >
                    {currentColunmCards && currentColunmCards.map((el,i)=>{
                        return(
                        <div key={'externalTd'+el._id} style={{marginTop: '10px'}}>
                            <KanbanCard history={history} boardId={boardId} info={el} currCategory={category._id} timelineId={timelineId} />
                        </div>
                        )
                    })}
            </div>
        </div> 
   
    );    
}



export default ExternalCategoryTd


