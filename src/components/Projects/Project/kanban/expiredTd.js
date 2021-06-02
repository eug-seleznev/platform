import React from "react"
import { useDispatch} from "react-redux"
import styles from './kanban.module.css'
import KanbanCard from "./card/card";
import { finishExpired } from "../../../../redux/actions/kanban";




const ExpiredColumn = ({ category, boardId, timelineId,history}) => {
    const dispatch = useDispatch()

    const finish = (id) => {
        dispatch(finishExpired(id, boardId))
    }
    
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
                    <div>
                    <div onClick={()=>finish(el._id)}>завершить \/</div>
                        <KanbanCard notDraggable history={history} boardId={boardId} key={i} info={el} currCategory={category._id} timelineId={timelineId} />
                    </div>
                )
            })}
    </div>
    )
}
export default ExpiredColumn