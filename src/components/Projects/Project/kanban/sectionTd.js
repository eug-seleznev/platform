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





const KanbanSectionTd = ({twoColumns, category, column}) => {
    const dispatch = useDispatch()
    const project = useSelector(state => state.projects.project)
    const [hower, setHower] = useState(false)
    const [addGhost, setAddGhost] = useState(false)
    const refBG = useRef(null)
console.log('category',category)
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
        // dispatch(moveCard(cardId))
    }


    return (
  
     
            <div 
                ref={refBG}
                className={styles.td} 
                style={{
                    gridTemplateColumns: twoColumns? 'max-content max-content' : '1fr',
                    // backgroundColor: hower? '#8b97c2' : 'white',
                    transitionDuration: '250ms'
                }} 
                onDragOver={e=>dragOver(e)}
                onDragLeave={e=>dragOut(e)}
                onDragEnd={e=>dragOut(e)}
                onDrop={e=>dropCard(e)}
                onMouseOver={()=>setHower(true)}
                onMouseOut={()=>setHower(false)}
                >
              <KanbanCard />
              <KanbanCard />
              <KanbanCard />
                {category?.events?.filter(el=>el.column===column).map((el,i)=>{
                    return(
                        <KanbanCard info={el} />
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

            </div>
            
   
    );    
}



export default KanbanSectionTd