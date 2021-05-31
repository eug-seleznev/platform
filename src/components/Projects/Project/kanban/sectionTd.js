import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"



import sprintCss from '../../../../Styles/modules/components/sprintCard.module.css'
import styles from './kanban.module.css'
import { Select, NEW_TABLE, NEW_TBODY, NEW_THEAD, NEW_TD, NEW_TH, NEW_TR } from '../../../../Styles/tables';
import { Light } from "../../../../Styles/typography";
import Tag from "../../components/OneProject/tag";
import getDate from "../../getDate";
import KanbanCard from "./card/card";
import { CSSTransition } from "react-transition-group";
import { moveCard } from "../../../../redux/actions/kanban";
import { ButtonText } from "../../../../Styles/buttons";
import CreateForm from "./createForm";
import { Path } from '../../../Layout/header'





const KanbanSectionTd = ({category, timelineCards, column, boardId, timelineId,history}) => {
    const dispatch = useDispatch()
    const project = useSelector(state => state.projects.project)

    const currentColunmCards = timelineCards &&  timelineCards.filter(el=>el.column===column)
    const [hower, setHower] = useState(false)
    const [newCardModal, setNewCardModal] = useState(false)
    const [addGhost, setAddGhost] = useState(false)
    const refBG = useRef(null)
// console.log('category',category)
const dragFunction = (e, index) => {
    console.log('index',index)
    try {
        const data = JSON.parse(e.dataTransfer.getData('text'));
        console.log('dataaaaaaaaaaaa',data)
        dispatch(moveCard({
            cardId:data.cardId, 
            from: data.backlog ? 'backlog' : 'timeline',
            oldPlaceId: data.timelineId ||  undefined,
            to : 'timeline',
            newPlaceId : timelineId,
            column: column,
            board_id: boardId,
            index: index? index : (timelineCards.length-1)
        }))

    } catch (e) {
        console.log('Не получилось переместить карточку', e)
    }
}


    const dragOver = (e) => {
        e.preventDefault()
        refBG.current.style.backgroundColor = 'rgb(227, 225, 233)'
        setAddGhost('ghost last')
    }
    const dragOut = (e) => {
        e.preventDefault()
        refBG.current.style.backgroundColor='white'
        setAddGhost(false)
    }
    const cardDragOver = (e,i) => {
        e.preventDefault()
        e.stopPropagation()
        // console.log('he')

        refBG.current.style.backgroundColor = 'rgb(227, 225, 233)'
        setAddGhost(`ghost${i}`)
    }
    const cardDragOut = (e) => {
        e.preventDefault()
        e.stopPropagation()
        refBG.current.style.backgroundColor='white'
        setAddGhost(false)
    }
    const dropCard = (e) => {
        e.preventDefault()
        refBG.current.style.backgroundColor='white'
        setAddGhost(false)
        dragFunction(e)
    }
    const dropToCard = (e, index) => {
        e.stopPropagation()
        dragFunction(e, index)
        setAddGhost(false)
        refBG.current.style.backgroundColor='white'

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
                            <div onDragOver={(e)=>cardDragOver(e,i)} onDragLeave={(e)=>cardDragOut(e)} onDrop={(e)=>dropToCard(e,el.huindex)}>
                            
                            {addGhost===`ghost${i}`?<div className={styles.addGhost}/>
                            :
                            <KanbanCard history={history} boardId={boardId} key={i} info={el} currCategory={category._id} timelineId={timelineId} />}
                            </div>
                        )
                    })}

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
                    >
                        <div className={styles.addGhost}/>
                    </CSSTransition>
                
                    <div className={styles.creationButton}>
                        <ButtonText onClick={()=>setNewCardModal(true)}>
                            <img alt='plus' src={Path+'plus1.png'}className={styles.categoryCardPlus}/>
                            Создать карточку
                        </ButtonText> 
                    </div>
     
                    <CreateForm 
                        crypt={project.crypt} 
                        categoryId={category._id} 
                        column={column} 
                        timeline={timelineId} 
                        visible={newCardModal} 
                        place={'category'} 
                        setCreateOpen={()=>setNewCardModal()} 
                        boardId={boardId}
                    />
            </div>
            
   
    );    
}



export default KanbanSectionTd