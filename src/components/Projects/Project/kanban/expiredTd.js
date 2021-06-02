import React from "react"
import styles from './kanban.module.css'
import KanbanCard from "./card/card";




const ExpiredColumn = ({ category, boardId, timelineId,history}) => {

    return(
        <div 
        // ref={refBG}
        className={styles.td} 
        style={{width: '235px'}}
        // onDragOver={e=>dragOver(e)}
        // onDragLeave={e=>dragOut(e)}
        // onDragEnd={e=>dragOut(e)}
        // onDrop={e=>dropCard(e)}
        // onMouseOver={()=>setHower(true)}
        >
            {category.expired.map((el,i)=>{
                return(
                    // <div onDragOver={(e)=>cardDragOver(e,i)} onDragLeave={(e)=>cardDragOut(e)} onDrop={(e)=>dropToCard(e,el.huindex)}>
                        <KanbanCard notDraggable history={history} boardId={boardId} key={i} info={el} currCategory={category._id} timelineId={timelineId} />
                )
            })}
    </div>
    )
}
export default ExpiredColumn