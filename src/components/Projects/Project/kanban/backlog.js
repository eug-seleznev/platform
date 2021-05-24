import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewCard } from '../../../../redux/actions/kanban'
import { ButtonTextLight } from '../../../../Styles/buttons'
import { Path } from '../../../Layout/header'
import KanbanCard from './card/card'
import styles from './kanban.module.css'
import { CSSTransition } from "react-transition-group";
import { moveCard } from "../../../../redux/actions/kanban";


const Backlog =({sideOpen,setCreateOpen, backlog, projectCrypt, boardId})=>{
    const dispatch = useDispatch()
    const createFromBacklog = ()=>{
        setCreateOpen ({
            status:true,
            place:'backlog'
        })
    }
    // const refBG = useRef(null)
    const [addGhost, setAddGhost] = useState(false)

    const dragOver = (e) => {
        e.preventDefault()
        // refBG.current.style.backgroundColor = 'rgb(227, 225, 233)'
        setAddGhost(true)
    }
    const dragOut = (e) => {
        e.preventDefault()
        // refBG.current.style.backgroundColor='white'
        setAddGhost(false)
    }
    const dropCard = (e) => {
        e.preventDefault()
        // refBG.current.style.backgroundColor='white'
        setAddGhost(false)
        try {
            const data = JSON.parse(e.dataTransfer.getData('text'));
            dispatch(moveCard({
                cardId:data.cardId, 
                from:data.categoryId ? 'event' : data.timelineId ? 'timeline': data.backlog && 'backlog',
                oldPlaceId: data.categoryId || data.timelineId || undefined,
                to : 'backlog' ,
                newPlaceId : projectCrypt ,
                board_id : boardId,
            }))

        } catch (e) {
            console.log('Не получилось переместить карточку', e)
        }
    }
    
    return (
        <>
        <div 
            style={{display: sideOpen? 'block' : 'none'}} 
            onDragOver={dragOver} 
            onDragLeave={dragOut} 
            onDrop={dropCard}
            >
            <div className={styles.backLogCards} >
                {backlog?.map((card,i)=>{

                    return(
                         <KanbanCard key={i} info={card} backlog={true}/>
                    )
                })

                }
               <CSSTransition
                in={addGhost}
                timeout={200}
                classNames={{
                enter: styles.ghostEnter,
                enterActive: styles.ghostEnterActive,
                exit: styles.ghostExit,
                exitActive: styles.ghostExitActive,
                }}
                unmountOnExit
                // onEntered={() => ghostEntered()}
                // onExited={() => setNext(true)}
            >
                    <div className={styles.addGhost}/>
            </CSSTransition>
                
            </div>
            <div className={styles.backLogButtonCont}>
                <div className={styles.backLogButton} onClick={createFromBacklog}>
                    <img alt='plus' src={Path+'plus1.png'}className={styles.backLogPlus}></img>
                    <ButtonTextLight color='white'style={{fontStyle:'italic'}}>Добавить карточку</ButtonTextLight>
                </div>
            </div>
            
        </div>
        
        </>
        
    )
}
export default Backlog