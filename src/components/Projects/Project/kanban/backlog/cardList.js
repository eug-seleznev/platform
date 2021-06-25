import { useState } from 'react'
import { useDispatch } from 'react-redux'
import KanbanCard from '../card/card'
import styles from './backlog.module.css'
import { moveCard } from "../../../../../redux/actions/kanban";
import GhostCard from '../components/ghostCard'

const CardList =({backlog, projectCrypt, boardId, history, filterredCards})=>{

    const dispatch = useDispatch()

    const [addGhost, setAddGhost] = useState(false)


    const dragFunction = (e,index) => {
        try {
            const data = JSON.parse(e.dataTransfer.getData('text'));
            dispatch(moveCard({
                cardId:data.cardId, 
                from:  data.backlog ? 'backlog' : 'timeline',
                oldPlaceId:  data.timelineId || undefined,
                to : 'backlog' ,
                newPlaceId : projectCrypt ,
                board_id : boardId,
                index: index,
            }))

        } catch (e) {
            console.log('Не получилось переместить карточку', e)
        }
    }

    const dragOver = (e) => {
        e.preventDefault()
        // setAddGhost('ghost last')
    }
    const dragOut = (e) => {
        e.preventDefault()
        setAddGhost(false)
    }
    const dropCard = (e) => {
        e.preventDefault()
        dragFunction(e, backlog.length)

        setAddGhost(false)
    
    }
    const cardDragOver = (e,i) => {
        e.preventDefault()
        e.stopPropagation()
        setAddGhost(`ghost${i}`)
        console.log('lol', addGhost)
    }
    const cardDragOut = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setAddGhost(false)
    }
    const dropToCard = (e, index) => {
        e.stopPropagation()
        console.log('drop to card')
        dragFunction(e, index)
        setAddGhost(false)

      }

    
    return (
        
            <div 
                className={styles.backLogListContainer} 
                onDragOverCapture={dragOver} 
                onDragLeave={dragOut} 
                onDrop={dropCard}
                >
                <div onDragOver={e=>e.stopPropagation()} className={styles.backLogCardsList} >
                    {filterredCards.map((card,i)=>{
                        return(
                            <div style={{paddingTop:'10px'}}  onDragOverCapture={(e)=>cardDragOver(e,i)}  onDrop={(e)=>dropToCard(e,i)}>
                            
                                {addGhost===`ghost${i}`?<GhostCard visible={true} />
                                
                                :<KanbanCard history={history} key={i} info={card} backlog={true}/>}
                           
                            </div>
                        )
                    })}
                </div>
               <GhostCard visible={addGhost==='ghost last'} />
            </div>
           
    )
}
export default CardList