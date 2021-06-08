import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewCard } from '../../../../redux/actions/kanban'
import { ButtonTextLight } from '../../../../Styles/buttons'
import { Path } from '../../../Layout/header'
import KanbanCard from './card/card'
import styles from './kanban.module.css'
import { CSSTransition } from "react-transition-group";
import { moveCard } from "../../../../redux/actions/kanban";
import { Regular } from '../../../../Styles/typography'


const Backlog =({sideOpen,setCreateOpen, backlog, projectCrypt, boardId, history})=>{
    const dispatch = useDispatch()
    const createFromBacklog = (e)=>{
        e.stopPropagation()

        setCreateOpen ({
            status:true,
            place:'backlog'
        })
    }
    // const refBG = useRef(null)
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
        // refBG.current.style.backgroundColor = 'rgb(227, 225, 233)'
        setAddGhost('ghost last')
    }
    const dragOut = (e) => {
        e.preventDefault()
        // refBG.current.style.backgroundColor='white'
        setAddGhost(false)
    }
    const dropCard = (e) => {
        e.preventDefault()
        // refBG.current.style.backgroundColor='white'
        dragFunction(e, backlog.length)

        setAddGhost(false)
    
    }
    const cardDragOver = (e,i) => {
        e.preventDefault()
        e.stopPropagation()
        // console.log('he')

        setAddGhost(`ghost${i}`)
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
    //   console.log('backlog', backlog)


    return (
        <>
        <div 
            style={{display: sideOpen? 'block' : 'none'}} 
            onDragOver={dragOver} 
            onDragLeave={dragOut} 
            onDrop={dropCard}
            >
                <div style={{display:'flex', margin:'8px', marginBottom:'30px'}}>
                    <Regular size='18' color='white'>
                        Все задачи
                    </Regular>
                    <Regular size='18' color='grey' style={{marginLeft:'15px'}}>{backlog?.length}</Regular>
                    <img src={Path+'kanban-open-icon-white.png'} style={{width: '10px', height: '15px',alignSelf: 'center',marginLeft: "auto", marginRight: '10px',cursor: 'pointer'}} />
                </div>
            
            <div className={styles.backLogCards} >
                <div onDragOver={e=>e.stopPropagation()} >
                {backlog && backlog?.map((card,i)=>{

                    return(
                        <div onDragOver={(e)=>cardDragOver(e,i)} onDragLeave={(e)=>cardDragOut(e)} onDrop={(e)=>dropToCard(e,i)}>
                        
                        {addGhost===`ghost${i}`?<div className={styles.addGhost}/>
                        :
                        <KanbanCard history={history} key={i} info={card} backlog={true}/>
                        }
                        </div>
                    )
                })

                }
                </div>
               <CSSTransition
                    in={addGhost==='ghost last'}
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