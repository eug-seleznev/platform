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





const KanbanSectionTd = ({twoColumns, category, column, boardId, timeline}) => {
    const dispatch = useDispatch()
    const project = useSelector(state => state.projects.project)
    const currentColunmCards = timeline? category?.timeline[0]?.cards?.filter(el=>el.column===column) : category?.events?.filter(el=>el.column===column)
    const [hower, setHower] = useState(false)
    const [newCardModal, setNewCardModal] = useState(false)
    const [addGhost, setAddGhost] = useState(false)
    const refBG = useRef(null)
// console.log('category',category)
    const dragOver = (e) => {
        e.preventDefault()
        refBG.current.style.backgroundColor = 'rgb(227, 225, 233)'
        setAddGhost(true)
    }
    const dragOut = (e) => {
        e.preventDefault()
        refBG.current.style.backgroundColor='white'
        setAddGhost(false)
    }
    const dropCard = (e) => {
        e.preventDefault()
        refBG.current.style.backgroundColor='white'
        setAddGhost(false)
        try {
            const data = JSON.parse(e.dataTransfer.getData('text'));
            console.log('dataaaaaaaaaaaa',data)
            dispatch(moveCard({
                cardId:data.cardId, 
                from: data.timelineId ? 'timeline': data.categoryId ? 'event' : data.backlog && 'backlog',
                oldPlaceId: data.timelineId || data.categoryId ||  undefined,
                to : timeline ? 'timeline' : 'event' ,
                newPlaceId : timeline ?  category.timeline[0]._id : category._id ,
                column:column,
                board_id: boardId,
            }))

        } catch (e) {
            console.log('Не получилось переместить карточку', e)
        }
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
                onMouseOut={()=>setHower(false)}
                >
              
                {currentColunmCards && currentColunmCards.map((el,i)=>{
                    return(
                        <KanbanCard info={el} currCategory={category._id} timelineId={category?.timeline[0]?._id}  />
                    )
                })}

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
                timeline={category.timeline.length>0? category.timeline[0]._id : undefined} 
                visible={newCardModal} 
                place={'category'} 
                setCreateOpen={()=>setNewCardModal()} 
                boardId={boardId}/>
            </div>
            
   
    );    
}



export default KanbanSectionTd