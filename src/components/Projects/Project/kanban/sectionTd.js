import {  useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"



import styles from './kanban.module.css'
import ghostStyles from './components/ghostCard.module.css'

import KanbanCard from "./card/card";
import { CSSTransition } from "react-transition-group";
import { clearBoard, moveCard } from "../../../../redux/actions/kanban";
import { ButtonText, KanbanButton } from "../../../../Styles/buttons";
import CreateForm from "./components/createForm";
import { Path } from '../../../Layout/header'





const KanbanSectionTd = ({category, timelineCards, column, boardId, timelineId,history}) => {
    const dispatch = useDispatch()
    const project = useSelector(state => state.projects.project)
    const theme = useSelector(state => state.auth.user.theme)
    let currentColunmCards = timelineCards &&  timelineCards.filter(el=>el.column===column)
    const [hower, setHower] = useState(false)
    const [newCardModal, setNewCardModal] = useState(false)
    const [addGhost, setAddGhost] = useState(false)
    const refBG = useRef(null)
// console.log('category',category)
const dragFunction = (e, index) => {
    // console.log('index',index)
    try {
        const data = JSON.parse(e.dataTransfer.getData('text'));
        // console.log('dataaaaaaaaaaaa',data)
        dispatch(moveCard({
            cardId:data.cardId, 
            from: data.expired? 'expired': data.backlog ? 'backlog' : 'timeline',
            oldPlaceId: data.expired? data.categoryId : data.backlog ? undefined:  data.timelineId,
            to : 'timeline',
            newPlaceId : timelineId,
            column: column,
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
        refBG.current.style.backgroundColor=theme?'#0D1117':'rgb(248, 248, 250)'
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

        refBG.current.style.backgroundColor=theme?'#0D1117':'rgb(248, 248, 250)'
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
        dragFunction(e, timelineCards.length)
    }
    const dropToCard = (e, index) => {
        e.stopPropagation()
        console.log('index',index)
        dragFunction(e, index)
        setAddGhost(false)
        refBG.current.style.backgroundColor=theme?'#0D1117':'white'

      }
    


    return (
  
     
            <div 
                ref={refBG}
                className={styles.td} 
                onDragOver={e=>dragOver(e)}
                onDragLeave={e=>dragOut(e)}
                onDragEnd={e=>dragOut(e)}
                onDrop={e=>dropCard(e)}
                onMouseOver={()=>setHower(true)}
                >
                    {currentColunmCards && currentColunmCards.map((el,i)=>{
                        return(
                            <div key={'sectionTd'+el._id} onDragOver={(e)=>cardDragOver(e,i)} onDragLeave={(e)=>cardDragOut(e)} onDrop={(e)=>dropToCard(e,el.huindex)} style={{marginTop:'10px'}}>
                            
                            {addGhost===`ghost${i}`?<div className={ghostStyles.addGhost}/>
                            :
                            <KanbanCard history={history} boardId={boardId} key={i} info={el} currCategory={category._id} timelineId={timelineId} />}
                            </div>
                        )
                    })}

                    <CSSTransition
                        in={addGhost==='ghost last'}
                        timeout={20}
                        classNames={{
                            enter: styles.ghostEnter,
                            enterActive: styles.ghostEnterActive,
                            exit: styles.ghostExit,
                            exitActive: styles.ghostExitActive,
                            }}
                        unmountOnExit
                    >
                        <div style={{marginTop:'10px'}} className={ghostStyles.addGhost}/>
                    </CSSTransition>
                
                    {!newCardModal
                        ?<KanbanButton color={theme?'#E4E4E4':'#A1A1A1'} bg={theme?'#404040':'rgba(196, 196, 196, 0.2)'} className={styles.creationButton} onClick={()=>setNewCardModal(true)} >
                            <img src={Path+(theme?'kanban-plus-white.png':'kanban-plus-dark.png')} />
                            Создать карточку
                        </KanbanButton>  
                        
        
                        :<CreateForm 
                            crypt={project.crypt} 
                            categoryId={category._id} 
                            column={column} 
                            timeline={timelineId} 
                            closeForm={()=>setNewCardModal()} 
                            boardId={boardId}
                        />
                    }
            </div>
            
   
    );    
}



export default KanbanSectionTd


