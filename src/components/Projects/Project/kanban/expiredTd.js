import React from "react"
import styles from './kanban.module.css'
import KanbanCard from "./card/card";




const ExpiredColumn = ({ category, boardId, timelineId,history}) => {

    return(
        <div 
        className={styles.td} 
        style={{width: '235px'}}
        >
            {category.expired.map((el,i)=>{
                return(
                    <KanbanCard notDraggable history={history} boardId={boardId} key={i} info={el} currCategory={category._id} timelineId={timelineId} />
                )
            })}
    </div>
    )
}
export default ExpiredColumn