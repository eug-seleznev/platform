import React, { useEffect, useRef, useState } from "react"
import styles from './kanban.module.css'
import KanbanCard from "./card/card";

import { moveCard } from "../../../../redux/actions/kanban";
import { useDispatch, useSelector } from "react-redux";



const ExpiredColumn = ({ category, boardId, timelineId,history, column}) => {
const theme =  useSelector (state=>state.auth.user.theme)
const dispatch = useDispatch()
const refBG = useRef()
const [addGhost, setAddGhost] = useState()

    const dragFunction = (e, index) => {
        // console.log('index',index)
        try {
            const data = JSON.parse(e.dataTransfer.getData('text'));
            // console.log('dataaaaaaaaaaaa',data)
            dispatch(moveCard({
                cardId:data.cardId, 
                from: data.expired? 'expired': data.backlog ? 'backlog' : 'timeline',
                oldPlaceId: data.expired? data.categoryId : data.backlog ? undefined:  data.timelineId,
                to : 'expired',
                newPlaceId : category._id,
                board_id: boardId,
                index: index
            }))
    
        } catch (e) {
            console.log('Не получилось переместить карточку', e)
        }
    }
    useEffect(()=>{
        refBG.current.style.backgroundColor=theme?'#0D1117':'white'
    },[theme])

    const dragOver = (e) => {
        e.preventDefault()
        refBG.current.style.backgroundColor =theme?'#0D1117':'rgb(248, 248, 250)'
        setAddGhost('ghost last')
    }
    const dragOut = (e) => {
        e.preventDefault()
        refBG.current.style.backgroundColor=theme?'#0D1117':'white'
        setAddGhost(false)
    }
    const cardDragOver = (e,i) => {
        e.preventDefault()
        e.stopPropagation()
        // console.log('he')

        refBG.current.style.backgroundColor = theme?'#0D1117':'rgb(248, 248, 250)'
        setAddGhost(`ghost${i}`)
    }
    const cardDragOut = (e) => {
        e.preventDefault()
        e.stopPropagation()
        refBG.current.style.backgroundColor=theme?'#0D1117':'white'
        setAddGhost(false)
    }
    const dropCard = (e) => {
        e.preventDefault()
        refBG.current.style.backgroundColor=theme?'#0D1117':'white'
        setAddGhost(false)
        dragFunction(e, category.expired.length)
    }
    const dropToCard = (e, index) => {
        e.stopPropagation()
        console.log('index',index)
        dragFunction(e, index)
        setAddGhost(false)
        refBG.current.style.backgroundColor=theme?'#0D1117':'white'

      }



    return(
        <div 
            className={styles.td} 
            style={{width: '235px'}}
            ref={refBG}
            onDragOver={e=>dragOver(e)}
            onDragLeave={e=>dragOut(e)}
            onDragEnd={e=>dragOut(e)}
            onDrop={e=>dropCard(e)}
        >
            {category.expired.map((el,i)=>{
                return(
                    <div key={'expired'+el._id} onDragOver={(e)=>cardDragOver(e,i)} onDragLeave={(e)=>cardDragOut(e)} onDrop={(e)=>dropToCard(e,i)} style={{marginTop: '10px'}}>
                            
                            {addGhost===`ghost${i}`?<div className={styles.addGhost}/>
                            :
                            <KanbanCard expired history={history} boardId={boardId} key={i} info={el} currCategory={category._id} timelineId={timelineId} />
                            }
                            </div>
                )
            })}
    </div>
    )
}
export default ExpiredColumn