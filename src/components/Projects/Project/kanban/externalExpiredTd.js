import React from "react"
import styles from './kanban.module.css'
import KanbanCard from "./card/card";
import {  useSelector } from "react-redux";
import { Regular } from "../../../../Styles/typography";



const ExternalExpiredColumn = ({ category, boardId, timelineId,history, column}) => {
const theme =  useSelector (state=>state.auth.user.theme)
   

    return(
        <div 
            className={styles.td} 
            style={{width: '235px'}}
        >
            <Regular >Просрочено</Regular>
            {category.expired.map((el,i)=>{
                return(
                    <div style={{marginTop: '10px'}} key={'extExpTd'+i}>
                        <KanbanCard expired history={history} boardId={boardId}  info={el} currCategory={category._id} timelineId={timelineId} />
                    </div>
                )
            })}
    </div>
    )
}
export default ExternalExpiredColumn